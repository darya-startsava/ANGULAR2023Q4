import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import {
    BehaviorSubject,
    debounceTime,
    filter,
    Observable,
    Subscription,
    switchMap
} from "rxjs";
import { searchVideos } from "src/app/redux/actions/search.actions";

import { FilterType } from "../models/filter-state.model";
import { Item } from "../models/search-item.model";
import {
    ResponseSearch,
    ResponseSnippet
} from "../models/search-response.model";

function buildParams(params: Record<string, string>): HttpParams {
    return new HttpParams({ fromObject: params });
}

@Injectable({
    providedIn: "root"
})
export class SearchResultService implements OnDestroy {
    private readonly urlSearch = "https://www.googleapis.com/youtube/v3/search";
    private readonly urlSnippet =
        "https://www.googleapis.com/youtube/v3/videos";
    private subscriptions: Subscription[] = [];
    private defaultState = {
        filterType: FilterType.SortByDate,
        isAsc: true,
        wordForFilterBy: ""
    };
    private filterState = this.defaultState;
    public data$ = new BehaviorSubject<Item[]>([]);
    private inputSubject$ = new BehaviorSubject<string>("");
    public nextPageToken$ = new BehaviorSubject<string>("");
    public prevPageToken$ = new BehaviorSubject<string>("");
    public maxResultsForFirstPage: number;

    constructor(
        private http: HttpClient,
        private store: Store
    ) {
        // TODO remove after resolving filter&sort methods
        const requestSubscription = this.inputSubject$
            .pipe(
                debounceTime(1000),
                filter((input) => input.length >= 3),
                switchMap((input) => this.getData(input))
            )
            .subscribe((data) => {
                this.data$.next(data.items);
            });
        this.subscriptions.push(requestSubscription);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((item) => item.unsubscribe());
    }

    public get wordForFilterBy(): string {
        return this.filterState.wordForFilterBy;
    }

    getData(
        input: string,
        pageToken = "",
        customItemsQuantity = 0
    ): Observable<ResponseSnippet> {
        // change maxResults to 20
        const maxResults = (5 - customItemsQuantity).toString();
        const paramsSearch = buildParams({
            type: "video",
            part: "snippet",
            maxResults,
            pageToken,
            q: input
        });
        return this.http
            .get<ResponseSearch>(this.urlSearch, { params: paramsSearch })
            .pipe(
                switchMap((data) => {
                    let idsString = "";
                    this.nextPageToken$.next(data.nextPageToken || "");
                    this.prevPageToken$.next(data.prevPageToken || "");
                    data.items.forEach(
                        (item) => (idsString += `,${item.id?.videoId}`)
                    );
                    const paramsSnippet = new HttpParams()
                        .set("id", idsString)
                        .set("part", "snippet,statistics");
                    return this.http.get<ResponseSnippet>(this.urlSnippet, {
                        params: paramsSnippet
                    });
                })
            );
    }

    changeFilterState(type: FilterType, filterByWordInput: string): void {
        this.filterState = {
            wordForFilterBy: filterByWordInput,
            isAsc:
                this.filterState.filterType === type
                    ? !this.filterState.isAsc
                    : this.filterState.isAsc,
            filterType: type
        };
    }

    sortByFilterType(dataItems: Item[]): Item[] {
        const { filterType, isAsc } = this.filterState;
        switch (filterType) {
            case FilterType.SortByDate: {
                return dataItems.sort((a, b) => {
                    if (isAsc) {
                        return (
                            +new Date(a.snippet.publishedAt) -
                            +new Date(b.snippet.publishedAt)
                        );
                    }
                    return (
                        +new Date(b.snippet.publishedAt) -
                        +new Date(a.snippet.publishedAt)
                    );
                });
            }
            case FilterType.SortByViewCount: {
                return dataItems.sort((a, b) => {
                    if (isAsc) {
                        return (
                            +a.statistics.viewCount - +b.statistics.viewCount
                        );
                    }
                    return +b.statistics.viewCount - +a.statistics.viewCount;
                });
            }
            default: {
                return dataItems;
            }
        }
    }

    sortData(): void {
        this.filterState.wordForFilterBy = "";
        const requestSubscription = this.data$.subscribe((data) =>
            this.sortByFilterType(data)
        );
        this.subscriptions.push(requestSubscription);
    }

    getItemById(id: string): Observable<ResponseSnippet> {
        const paramsSnippet = buildParams({
            id,
            part: "snippet,statistics"
        });
        return this.http.get<ResponseSnippet>(this.urlSnippet, {
            params: paramsSnippet
        });
    }

    setInput(searchInput: string): void {
        this.inputSubject$.next(searchInput);
        this.store.dispatch(searchVideos({ searchInput }));
    }
}

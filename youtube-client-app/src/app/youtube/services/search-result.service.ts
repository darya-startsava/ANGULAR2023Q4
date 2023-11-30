import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import {
    BehaviorSubject,
    debounceTime,
    EMPTY,
    Observable,
    Subscription,
    switchMap
} from "rxjs";

import { FilterType } from "../models/filter-state.model";
import { Item } from "../models/search-item.model";
import {
    ResponseSearch,
    ResponseSnippet
} from "../models/search-response.model";

@Injectable({
    providedIn: "root"
})
export class SearchResultService implements OnDestroy {
    private readonly urlSearch = "search";
    private readonly urlSnippet = "videos";
    private subscriptions: Subscription[] = [];
    private defaultState = {
        filterType: FilterType.SortByDate,
        isAsc: true,
        wordForFilterBy: ""
    };
    private filterState = this.defaultState;
    public data$ = new BehaviorSubject<Item[]>([]);
    private inputSubject = new BehaviorSubject<string>("");

    constructor(private http: HttpClient) {
        this.inputSubject
            .pipe(
                debounceTime(1000),
                switchMap((input) => {
                    if (input.length >= 3) {
                        return this.getData(input);
                    }
                    return EMPTY;
                })
            )
            .subscribe((data) => {
                this.data$.next(data.items);
            });
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((item) => item.unsubscribe());
    }

    public get wordForFilterBy(): string {
        return this.filterState.wordForFilterBy;
    }

    getData(input: string): Observable<ResponseSnippet> {
        const paramsSearch = new HttpParams()
            .set("type", "video")
            .set("part", "snippet")
            .set("maxResults", "15")
            .set("q", input);
        return this.http
            .get<ResponseSearch>(this.urlSearch, { params: paramsSearch })
            .pipe(
                switchMap((data) => {
                    console.log("data:", data);
                    let idsString = "";
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

    sort(dataItems: Item[]): Item[] {
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
            this.sort(data)
        );
        this.subscriptions.push(requestSubscription);
    }

    getItemById(id: string): Observable<ResponseSnippet> {
        const paramsSnippet = new HttpParams()
            .set("id", id)
            .set("part", "snippet,statistics");
        return this.http.get<ResponseSnippet>(this.urlSnippet, {
            params: paramsSnippet
        });
    }

    setInput(searchInput: string) {
        this.inputSubject.next(searchInput);
        console.log("searchInput", searchInput);
    }
}

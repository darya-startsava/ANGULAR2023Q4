import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { BehaviorSubject, Observable, switchMap } from "rxjs";
import { searchVideos } from "src/app/redux/actions/search.actions";

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
export class SearchResultService {
    private readonly urlSearch = "https://www.googleapis.com/youtube/v3/search";
    private readonly urlSnippet =
        "https://www.googleapis.com/youtube/v3/videos";
    private defaultState = {
        wordForFilterBy: ""
    };
    private filterState = this.defaultState;
    private inputSubject$ = new BehaviorSubject<string>("");
    public nextPageToken$ = new BehaviorSubject<string>("");
    public prevPageToken$ = new BehaviorSubject<string>("");
    public maxResultsForFirstPage: number;

    constructor(
        private http: HttpClient,
        private store: Store
    ) {}

    public get wordForFilterBy(): string {
        return this.filterState.wordForFilterBy;
    }

    getData(
        input: string,
        pageToken = "",
        customItemsQuantity = 0
    ): Observable<ResponseSnippet> {
        const maxResults = (20 - customItemsQuantity).toString();
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

    changeFilterState(filterByWordInput: string): void {
        this.filterState = {
            wordForFilterBy: filterByWordInput
        };
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

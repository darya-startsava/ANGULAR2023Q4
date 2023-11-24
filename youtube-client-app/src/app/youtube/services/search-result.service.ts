import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";

import { FilterType } from "../models/filter-state.model";
import { Item } from "../models/search-item.model";
import { Response } from "../models/search-response.model";

@Injectable({
    providedIn: "root"
})
export class SearchResultService implements OnDestroy {
    private readonly url = "assets/mockData/response.json";
    private subscriptionGetData: Subscription;
    private subscriptionFilterData: Subscription;
    private subscriptionGetItemById: Subscription;
    private defaultState = {
        filterType: FilterType.SortByDate,
        isAsc: true,
        wordForFilterBy: ""
    };
    private filterState = this.defaultState;
    public data$ = new BehaviorSubject<Item[]>([]);
    public item$ = new BehaviorSubject<Item>({} as Item);

    constructor(private http: HttpClient) {}

    ngOnDestroy(): void {
        this.subscriptionGetData.unsubscribe();
        this.subscriptionFilterData.unsubscribe();
        this.subscriptionGetItemById.unsubscribe();
    }

    public get wordForFilterBy(): string {
        return this.filterState.wordForFilterBy;
    }

    getData(): void {
        this.subscriptionGetData = this.http
            .get<Response>(this.url)
            .subscribe((data) => this.data$.next(data.items));
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
        this.subscriptionFilterData = this.http
            .get<Response>(this.url)
            .subscribe((data) => this.data$.next(this.sort(data.items)));
    }

    getItemById(id: string): void {
        this.getData();
        this.data$.subscribe((data) =>
            this.item$.next(data.find((i) => i.id === id))
        );
    }
}

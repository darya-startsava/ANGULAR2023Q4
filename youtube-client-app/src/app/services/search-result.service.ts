import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";

import { Item } from "../search/search-item.model";
import { Response } from "../search/search-response.model";

@Injectable({
    providedIn: "root"
})
export class SearchResultService implements OnDestroy {
    private readonly url = "assets/mockData/response.json";
    private subscription: Subscription;
    public data$ = new BehaviorSubject<Item[]>([]);
    constructor(private http: HttpClient) {}

    getData(): void {
        this.subscription = this.http
            .get<Response>(this.url)
            .subscribe((data) => this.data$.next(data.items));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

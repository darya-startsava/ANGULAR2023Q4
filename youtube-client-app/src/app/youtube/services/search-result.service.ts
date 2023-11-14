import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";

import { Item } from "../models/search-item.model";
import { Response } from "../models/search-response.model";

@Injectable({
    providedIn: "root"
})
export class SearchResultService implements OnDestroy {
    URL = "assets/mockData/response.json";
    subscription: Subscription;
    constructor(private http: HttpClient) {}
    public data$ = new BehaviorSubject<Item[]>([]);

    getData(): void {
        this.subscription = this.http
            .get<Response>(this.URL)
            .subscribe((data) => this.data$.next(data.items));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

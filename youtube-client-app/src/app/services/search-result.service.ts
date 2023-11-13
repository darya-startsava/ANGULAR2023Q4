import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { Item } from "../search/search-item.model";
import { Response } from "../search/search-response.model";

@Injectable({
    providedIn: "root"
})
export class SearchResultService {
    URL = "assets/mockData/response.json";
    constructor(private http: HttpClient) {}
    public data$ = new BehaviorSubject<Item[]>([]);

    getData(): void {
        this.http
            .get<Response>(this.URL)
            .subscribe((data) => this.data$.next(data.items));
    }
}

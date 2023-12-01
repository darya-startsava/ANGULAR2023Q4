import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { Item } from "../../models/search-item.model";
import { SearchResultService } from "../../services/search-result.service";
import { getDateStatus } from "../../utils";

@Component({
    selector: "app-detailed-information-page",
    templateUrl: "./detailed-information-page.component.html",
    styleUrls: ["./detailed-information-page.component.scss"]
})
export class DetailedInformationPageComponent implements OnInit, OnDestroy {
    dateStatus: string;
    item: Item;
    private subscriptions: Subscription[] = [];

    constructor(
        private route: ActivatedRoute,
        public searchResultService: SearchResultService
    ) {}

    ngOnInit(): void {
        this.getItem();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((item) => item.unsubscribe());
    }

    getItem(): void {
        const id = this.route.snapshot.paramMap.get("id");
        const requestSubscription = this.searchResultService
            .getItemById(id)
            .subscribe(({ items: [firstItem] }) => {
                this.item = firstItem;
                this.dateStatus = getDateStatus(this.item.snippet.publishedAt);
            });
        this.subscriptions.push(requestSubscription);
    }
}

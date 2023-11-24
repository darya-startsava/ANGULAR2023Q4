import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Item } from "../../models/search-item.model";
import { SearchResultService } from "../../services/search-result.service";

@Component({
    selector: "app-detailed-information-page",
    templateUrl: "./detailed-information-page.component.html",
    styleUrls: ["./detailed-information-page.component.scss"]
})
export class DetailedInformationPageComponent implements OnInit {
    dateStatus: string;
    item: Item;

    constructor(
        private route: ActivatedRoute,
        public searchResultService: SearchResultService
    ) {}

    ngOnInit(): void {
        this.getItem();
    }

    getItem(): void {
        const id = this.route.snapshot.paramMap.get("id");
        this.searchResultService.getItemById(id);
        this.searchResultService.item$.subscribe((item) => (this.item = item));
        this.dateStatus = Math.floor(
            (+new Date() - +new Date(this.item.snippet.publishedAt)) / 86400000
        ).toString();
    }
}

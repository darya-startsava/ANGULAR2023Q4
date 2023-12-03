import { Component, Input, OnInit } from "@angular/core";

import { Item } from "../../models/search-item.model";
import { getDateStatus } from "../../utils";

@Component({
    selector: "app-search-item",
    templateUrl: "./search-item.component.html",
    styleUrls: ["./search-item.component.scss"]
})
export class SearchItemComponent implements OnInit {
    @Input() item: Item;
    channelPictureUrl: string;
    dateStatus: string;

    ngOnInit(): void {
        this.channelPictureUrl = this.item.snippet.thumbnails.high.url;
        this.dateStatus = getDateStatus(this.item.snippet.publishedAt);
    }
}

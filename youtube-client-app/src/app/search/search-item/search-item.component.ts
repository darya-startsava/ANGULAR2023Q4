import { Component, Input, OnInit } from "@angular/core";

import { Item } from "../search-item.model";

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
        this.dateStatus = Math.floor(
            (+new Date() - +new Date(this.item.snippet.publishedAt)) / 86400000
        ).toString();
    }
}

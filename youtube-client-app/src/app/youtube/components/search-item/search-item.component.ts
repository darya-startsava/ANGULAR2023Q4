import { Component, Input, OnInit } from "@angular/core";
import { VideoItem } from "src/app/redux/state.models";

import { getDateStatus } from "../../utils";

@Component({
    selector: "app-search-item",
    templateUrl: "./search-item.component.html",
    styleUrls: ["./search-item.component.scss"]
})
export class SearchItemComponent implements OnInit {
    @Input() item: VideoItem;
    channelPictureUrl: string;
    dateStatus: string;

    ngOnInit(): void {
        this.channelPictureUrl = this.item.image;
        this.dateStatus = getDateStatus(this.item.publishedAt);
    }
}

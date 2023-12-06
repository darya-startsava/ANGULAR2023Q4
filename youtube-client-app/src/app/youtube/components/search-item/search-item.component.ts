import { Component, Input, OnInit } from "@angular/core";
import { CustomCard } from "src/app/redux/state.models";

import { Item } from "../../models/search-item.model";
import { getDateStatus } from "../../utils";

@Component({
    selector: "app-search-item",
    templateUrl: "./search-item.component.html",
    styleUrls: ["./search-item.component.scss"]
})
export class SearchItemComponent implements OnInit {
    @Input() item: CustomCard;
    channelPictureUrl: string;
    dateStatus: string;
    isFromFetch = false;

    ngOnInit(): void {
        this.channelPictureUrl = this.item.image;
        this.dateStatus = getDateStatus(this.item.date);
    }
}

import { Component, Input } from "@angular/core";
import { VideoItem } from "src/app/redux/state.models";

@Component({
    selector: "app-search-item",
    templateUrl: "./search-item.component.html",
    styleUrls: ["./search-item.component.scss"]
})
export class SearchItemComponent {
    @Input() item: VideoItem;
}

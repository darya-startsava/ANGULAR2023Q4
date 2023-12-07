import { Component, Input } from "@angular/core";
import { VideoItem } from "src/app/redux/state.models";

@Component({
    selector: "app-search-results",
    templateUrl: "./search-results.component.html",
    styleUrls: ["./search-results.component.scss"]
})
export class SearchResultsComponent {
    @Input() searchItems: VideoItem[];
}

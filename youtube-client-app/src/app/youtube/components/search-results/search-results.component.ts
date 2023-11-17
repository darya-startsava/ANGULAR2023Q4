import { Component, Input } from "@angular/core";

import { Item } from "../../models/search-item.model";

@Component({
    selector: "app-search-results",
    templateUrl: "./search-results.component.html",
    styleUrls: ["./search-results.component.scss"]
})
export class SearchResultsComponent {
    @Input() searchItems: Item[];
}

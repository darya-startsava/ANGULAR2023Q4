import { Component, Input } from "@angular/core";

import { Item } from "../search-item.model";

@Component({
    selector: "app-search-results",
    templateUrl: "./search-results.component.html",
    styleUrls: ["./search-results.component.scss"]
})
export class SearchResultsComponent {
    @Input() searchItems: Item[];
    @Input() isOrderedByDate: boolean;
    @Input() isOrderedByView: boolean;
    @Input() isAsc: boolean;
    @Input() isFilteredByWord: boolean;
    @Input() wordForFilterBy: string;
}

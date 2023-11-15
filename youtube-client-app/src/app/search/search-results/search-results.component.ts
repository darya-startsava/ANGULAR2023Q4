import { Component, Input } from "@angular/core";
import {
    FilterState,
    FilterType
} from "src/app/header/filters/filter-state.model";

import { Item } from "../search-item.model";

@Component({
    selector: "app-search-results",
    templateUrl: "./search-results.component.html",
    styleUrls: ["./search-results.component.scss"]
})
export class SearchResultsComponent {
    @Input() searchItems: Item[];

    sortItems(filterState: FilterState): Item[] {
        switch (filterState.filterType) {
            case FilterType.SortByDate: {
                return this.searchItems?.sort((a, b) => {
                    if (filterState.isAsc) {
                        return (
                            +new Date(a.snippet.publishedAt) -
                            +new Date(b.snippet.publishedAt)
                        );
                    }
                    return (
                        +new Date(b.snippet.publishedAt) -
                        +new Date(a.snippet.publishedAt)
                    );
                });
            }
            case FilterType.SortByViewCount: {
                return this.searchItems?.sort((a, b) => {
                    if (filterState.isAsc) {
                        return (
                            +a.statistics.viewCount - +b.statistics.viewCount
                        );
                    }
                    return +b.statistics.viewCount - +a.statistics.viewCount;
                });
            }
            default:
                return this.searchItems;
        }
    }
}

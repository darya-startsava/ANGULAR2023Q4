import { Component } from "@angular/core";
import { SearchResultService } from "src/app/youtube/services/search-result.service";

import { FilterType } from "../../../../youtube/models/filter-state.model";

@Component({
    selector: "app-sort-settings",
    templateUrl: "./sort-settings.component.html",
    styleUrls: ["./sort-settings.component.scss"]
})
export class SortSettingsComponent {
    public filterByWordInput = "";
    public filterType = FilterType;

    constructor(private searchResultService: SearchResultService) {}

    filter(type: FilterType): void {
        this.searchResultService.changeFilterState(
            type,
            this.filterByWordInput
        );
        if (
            type === FilterType.SortByDate ||
            type === FilterType.SortByViewCount
        ) {
            this.filterByWordInput = "";
            this.searchResultService.sortData();
        }
    }
}

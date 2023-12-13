import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import {
    sortByDate,
    sortByViewCount
} from "src/app/redux/actions/sort.actions";
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

    constructor(
        private searchResultService: SearchResultService,
        public store: Store
    ) {}

    filter(type: FilterType): void {
        this.searchResultService.changeFilterState(
            type,
            this.filterByWordInput
        );
        if (type === FilterType.SortByDate) {
            this.filterByWordInput = "";
            this.store.dispatch(sortByDate());
        } else if (type === FilterType.SortByViewCount) {
            this.filterByWordInput = "";
            this.store.dispatch(sortByViewCount());
        }
    }
}

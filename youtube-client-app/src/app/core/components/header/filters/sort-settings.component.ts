import { Component, EventEmitter, Output } from "@angular/core";

import {
    FilterState,
    SortType
} from "../../../../youtube/models/filter-state.model";

@Component({
    selector: "app-sort-settings",
    templateUrl: "./sort-settings.component.html",
    styleUrls: ["./sort-settings.component.scss"]
})
export class SortSettingsComponent {
    filterState = {
        isSorted: false,
        sortType: SortType.Date,
        isFilteredByWord: false,
        isAsc: true,
        wordForFilterBy: ""
    };
    filterByWordInput = "";
    sortType = SortType;
    @Output() changeFilters = new EventEmitter<FilterState>();

    sortBy(type: SortType): void {
        this.filterState.wordForFilterBy = "";
        this.filterState.isFilteredByWord = false;
        this.filterState.isAsc = !this.filterState.isAsc;
        this.filterState.isSorted = true;
        this.filterState.sortType = type;
        this.changeFilters.emit(this.filterState);
    }

    filterByWord(): void {
        this.filterState.wordForFilterBy = this.filterByWordInput || "";
        this.filterState.isFilteredByWord = true;
        this.filterState.isSorted = false;
        this.changeFilters.emit(this.filterState);
    }
}

import { Component, EventEmitter, Output } from "@angular/core";

import { FilterState, SortType } from "./filters/filter-state.model";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
    isShownSettings = false;
    filterState: FilterState = {
        isSorted: false,
        sortType: SortType.Date,
        isFilteredByWord: false,
        isAsc: true,
        wordForFilterBy: ""
    };

    @Output() changeFilters = new EventEmitter<FilterState>();

    toggleSettings(): void {
        this.isShownSettings = !this.isShownSettings;
    }

    onChangeFilters(filterState: FilterState) {
        this.filterState = filterState;
        this.changeFilters.emit(filterState);
    }
}

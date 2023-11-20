import { Component, EventEmitter, Output } from "@angular/core";

import { FilterState, FilterType } from "./filter-state.model";

@Component({
    selector: "app-sort-settings",
    templateUrl: "./sort-settings.component.html",
    styleUrls: ["./sort-settings.component.scss"]
})
export class SortSettingsComponent {
    filterByWordInput = "";
    defaultState = {
        filterType: FilterType.SortByDate,
        isAsc: true,
        wordForFilterBy: this.filterByWordInput
    };
    filterState = this.defaultState;
    filterType = FilterType;

    @Output() changeFilters = new EventEmitter<FilterState>();

    filter(type: FilterType): void {
        this.filterState = {
            ...this.filterState,
            wordForFilterBy: this.filterByWordInput || "",
            isAsc:
                this.filterState.filterType === type
                    ? !this.filterState.isAsc
                    : this.filterState.isAsc,
            filterType: type
        };
        this.changeFilters.emit(this.filterState);
    }
}

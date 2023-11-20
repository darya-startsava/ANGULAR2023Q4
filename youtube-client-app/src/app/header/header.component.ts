import { Component, EventEmitter, Output } from "@angular/core";

import { FilterState } from "./filters/filter-state.model";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
    isShownSettings = false;
    wordForFilterBy = "";

    @Output() changeFilters = new EventEmitter<FilterState>();

    toggleSettings(): void {
        this.isShownSettings = !this.isShownSettings;
    }

    onChangeFilters(filterState: FilterState): void {
        this.wordForFilterBy = filterState.wordForFilterBy;
        this.changeFilters.emit(filterState);
    }
}

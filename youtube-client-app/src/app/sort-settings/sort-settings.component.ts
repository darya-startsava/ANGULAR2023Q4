import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
    selector: "app-sort-settings",
    templateUrl: "./sort-settings.component.html",
    styleUrls: ["./sort-settings.component.scss"]
})
export class SortSettingsComponent {
    filterByWordInput = new FormControl("");
    @Output() sortByDate = new EventEmitter();
    @Output() sortByViewCount = new EventEmitter();
    @Output() filterByWorld = new EventEmitter<string>();

    onSortByDate(): void {
        this.sortByDate.emit();
    }

    onSortByViewCount(): void {
        this.sortByViewCount.emit();
    }

    onFilterByWord(): void {
        this.filterByWorld.emit(this.filterByWordInput.value || "");
    }
}

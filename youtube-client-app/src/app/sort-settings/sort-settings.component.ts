import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "app-sort-settings",
    templateUrl: "./sort-settings.component.html",
    styleUrls: ["./sort-settings.component.scss"]
})
export class SortSettingsComponent {
    @Output() sortByDate = new EventEmitter();
    @Output() sortByViewCount = new EventEmitter();

    onSortByDate(): void {
        this.sortByDate.emit();
    }

    onSortByViewCount(): void {
        this.sortByViewCount.emit();
    }
}

import { Component } from "@angular/core";

import * as response from "../../assets/mockData/response.json";

@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.scss"]
})
export class MainComponent {
    isShownResults = false;
    isShownSettings = false;
    isSortByDate = false;
    isSortByViewCount = false;
    isFilteredByWord = false;
    isAsc = true;
    wordForFilterBy = "";
    response = JSON.parse(JSON.stringify(response));
    showResults(value: boolean): void {
        this.isShownResults = value;
        console.log(this.response.items[0]);
    }

    toggleSettings(): void {
        this.isShownSettings = !this.isShownSettings;
    }

    sortByDate(): void {
        if (this.isSortByDate) {
            this.isAsc = !this.isAsc;
        }
        this.isSortByDate = true;
        this.isSortByViewCount = false;
        this.isFilteredByWord = false;
        this.wordForFilterBy = "";
    }

    sortByViewCount(): void {
        if (this.isSortByViewCount) {
            this.isAsc = !this.isAsc;
        }
        this.isSortByViewCount = true;
        this.isSortByDate = false;
        this.isFilteredByWord = false;
        this.wordForFilterBy = "";
    }

    filterByWorld(value: string): void {
        this.isFilteredByWord = true;
        this.wordForFilterBy = value;
        this.isSortByViewCount = false;
        this.isSortByDate = false;
    }
}

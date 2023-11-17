import { Component } from "@angular/core";

import { SearchResultService } from "../../services/search-result.service";

@Component({
    selector: "app-main-page",
    templateUrl: "./main-page.component.html",
    styleUrls: ["./main-page.component.scss"]
})
export class MainPageComponent {
    constructor(public searchResultsService: SearchResultService) {}
}

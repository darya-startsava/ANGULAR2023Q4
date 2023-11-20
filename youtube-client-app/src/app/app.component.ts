import { Component } from "@angular/core";

import { SearchResultService } from "./services/search-result.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    title = "youtube-client-app";
    constructor(public searchResultsService: SearchResultService) {}
}

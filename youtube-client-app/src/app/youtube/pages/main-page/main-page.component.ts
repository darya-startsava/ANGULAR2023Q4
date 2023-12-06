import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectCurrentPageItems } from "src/app/redux/selectors/currentPageItems.selector";
import { AppState, CustomCard } from "src/app/redux/state.models";

import { SearchResultService } from "../../services/search-result.service";

@Component({
    selector: "app-main-page",
    templateUrl: "./main-page.component.html",
    styleUrls: ["./main-page.component.scss"]
})
export class MainPageComponent {
    currentPageItems$: Observable<CustomCard[]>;
    constructor(
        public searchResultService: SearchResultService,
        private store: Store<AppState>
    ) {
        this.currentPageItems$ = store.select(selectCurrentPageItems);
    }
}

import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import {
    goToNextPage,
    goToPreviousPage
} from "src/app/redux/actions/pagination.action";
import { selectCurrentPage } from "src/app/redux/selectors/currentPage.selectors";
import { selectCurrentPageItems } from "src/app/redux/selectors/currentPageItems.selectors";
import { AppState, VideoItem } from "src/app/redux/state.models";

import { SearchResultService } from "../../services/search-result.service";

@Component({
    selector: "app-main-page",
    templateUrl: "./main-page.component.html",
    styleUrls: ["./main-page.component.scss"]
})
export class MainPageComponent {
    currentPageItems$: Observable<VideoItem[]>;
    currentPage$: Observable<number>;

    constructor(
        public searchResultService: SearchResultService,
        private store: Store<AppState>
    ) {
        this.currentPageItems$ = store.select(selectCurrentPageItems);
      this.currentPage$ = store.select(selectCurrentPage);
    }

    goToPreviousPage() {
        this.store.dispatch(goToPreviousPage());
    }

    goToNextPage() {
        this.store.dispatch(goToNextPage());
    }
}

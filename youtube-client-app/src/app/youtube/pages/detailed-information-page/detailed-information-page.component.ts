import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { clearDetailedInformationStore } from "src/app/redux/actions/delete.actions";
import { searchVideoById } from "src/app/redux/actions/search.actions";
import {
    selectCurrentItem,
    selectCurrentVideo
} from "src/app/redux/selectors/currentItem.selectors";
import { AppState, VideoItem } from "src/app/redux/state.models";

import { SearchResultService } from "../../services/search-result.service";

@Component({
    selector: "app-detailed-information-page",
    templateUrl: "./detailed-information-page.component.html",
    styleUrls: ["./detailed-information-page.component.scss"]
})
export class DetailedInformationPageComponent implements OnInit, OnDestroy {
    item$: Observable<VideoItem>;
    private subscriptions: Subscription[] = [];

    constructor(
        private route: ActivatedRoute,
        public searchResultService: SearchResultService,
        private store: Store<AppState>
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get("id");
        if (id.includes("customCard")) {
            this.item$ = this.store.select(selectCurrentItem);
        } else {
            this.getItem(id);
            this.item$ = this.store.select<VideoItem>(selectCurrentVideo);
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((item) => item.unsubscribe());
        this.store.dispatch(clearDetailedInformationStore());
    }

    getItem(id: string): void {
        this.store.dispatch(searchVideoById({ id }));
    }
}

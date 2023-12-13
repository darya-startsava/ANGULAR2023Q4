import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { deleteCustomCard } from "src/app/redux/actions/card.actions";
import { clearDetailedInformationStore } from "src/app/redux/actions/delete.actions";
import {
    addToFavorite,
    removeFromFavorite
} from "src/app/redux/actions/favorite.actions";
import { searchVideoById } from "src/app/redux/actions/search.actions";
import {
    selectCurrentItem,
    selectCurrentVideo
} from "src/app/redux/selectors/currentItem.selectors";
import { selectFavoriteIds } from "src/app/redux/selectors/favorite.selectors";
import { AppState, VideoItem } from "src/app/redux/state.models";

import { SearchResultService } from "../../services/search-result.service";

@Component({
    selector: "app-detailed-information-page",
    templateUrl: "./detailed-information-page.component.html",
    styleUrls: ["./detailed-information-page.component.scss"]
})
export class DetailedInformationPageComponent implements OnInit, OnDestroy {
    item$: Observable<VideoItem>;
    favoriteItems$: Observable<Array<string>>;
    private subscriptions: Subscription[] = [];
    id: string;

    constructor(
        private route: ActivatedRoute,
        public searchResultService: SearchResultService,
        private store: Store<AppState>,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get("id");
        this.favoriteItems$ = this.store.select(selectFavoriteIds);
        if (this.id.includes("customCard")) {
            this.item$ = this.store.select(selectCurrentItem);
        } else {
            this.getItem(this.id);
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

    deleteCustomCard():void {
        this.store.dispatch(deleteCustomCard({ id: this.id }));
        this.router.navigate(["/main"]);
    }

    removeFromFavorite(): void {
        const subscription = this.item$.subscribe((item) => {
            if (item) {
                this.store.dispatch(removeFromFavorite({ id: item.id }));
            }
        });
        this.subscriptions.push(subscription);
    }

    addToFavorite(): void {
        const subscription = this.item$.subscribe((item) => {
            if (item) {
                this.store.dispatch(addToFavorite({ id: item.id }));
            }
        });
        this.subscriptions.push(subscription);
    }
}

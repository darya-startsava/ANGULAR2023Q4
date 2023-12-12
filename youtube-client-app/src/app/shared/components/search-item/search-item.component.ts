import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { deleteCustomCard } from "src/app/redux/actions/card.actions";
import {
    addToFavorite,
    removeFromFavorite
} from "src/app/redux/actions/favorite.actions";
import { selectFavoriteIds } from "src/app/redux/selectors/favorite.selectors";
import { AppState, VideoItem } from "src/app/redux/state.models";

@Component({
    selector: "app-search-item",
    templateUrl: "./search-item.component.html",
    styleUrls: ["./search-item.component.scss"]
})
export class SearchItemComponent implements OnInit {
    @Input() item: VideoItem;
    favoriteItems$: Observable<Array<string>>;

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.favoriteItems$ = this.store.select(selectFavoriteIds);
    }

    deleteCustomCard() {
        this.store.dispatch(deleteCustomCard({ id: this.item.id }));
    }
    removeFromFavorite(): void {
        this.store.dispatch(removeFromFavorite({ id: this.item.id }));
    }

    addToFavorite(): void {
        this.store.dispatch(addToFavorite({ id: this.item.id }));
    }
}

import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { removeFromFavorite } from "src/app/redux/actions/favorite.actions";
import { AppState, VideoItem } from "src/app/redux/state.models";

@Component({
    selector: "app-favorite-item",
    templateUrl: "./favorite-item.component.html",
    styleUrls: ["./favorite-item.component.scss"]
})
export class FavoriteItemComponent {
    @Input() item: VideoItem;

    constructor(private store: Store<AppState>) {}

    removeFromFavorite(): void {
        this.store.dispatch(removeFromFavorite({ id: this.item.id }));
    }
}

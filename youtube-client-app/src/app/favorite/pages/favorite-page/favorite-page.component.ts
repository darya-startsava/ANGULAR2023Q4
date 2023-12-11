import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectFavorite } from "src/app/redux/selectors/favorite.selectors";
import { AppState, VideoItem } from "src/app/redux/state.models";

@Component({
    selector: "app-favorite-page",
    templateUrl: "./favorite-page.component.html",
    styleUrls: ["./favorite-page.component.scss"]
})
export class FavoritePageComponent {
    favoriteItems$: Observable<VideoItem[]>;

    constructor(private store: Store<AppState>) {
        this.favoriteItems$ = this.store.select(selectFavorite);
    }
}

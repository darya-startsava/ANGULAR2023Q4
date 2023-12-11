import { Component, Input } from "@angular/core";
import { VideoItem } from "src/app/redux/state.models";

@Component({
    selector: "app-favorite-items",
    templateUrl: "./favorite-items.component.html",
    styleUrls: ["./favorite-items.component.scss"]
})
export class FavoriteItemsComponent {
    @Input() favoriteItems: VideoItem[];
}

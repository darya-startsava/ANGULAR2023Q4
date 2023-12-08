import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { deleteCustomCard } from "src/app/redux/actions/card.actions";
import { AppState, VideoItem } from "src/app/redux/state.models";

@Component({
    selector: "app-search-item",
    templateUrl: "./search-item.component.html",
    styleUrls: ["./search-item.component.scss"]
})
export class SearchItemComponent {
    @Input() item: VideoItem;

    constructor(private store: Store<AppState>) {}

    deleteCustomCard() {
        this.store.dispatch(deleteCustomCard({ id: this.item.id }));
    }
}

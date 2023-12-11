import { Component, Input } from "@angular/core";
import { Statistics } from "src/app/redux/state.models";

@Component({
    selector: "app-item-statistics",
    templateUrl: "./item-statistics.component.html",
    styleUrls: ["./item-statistics.component.scss"]
})
export class ItemStatisticsComponent {
    @Input() statistics: Statistics;
}

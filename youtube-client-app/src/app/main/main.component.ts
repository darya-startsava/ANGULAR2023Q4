import { Component } from "@angular/core";

import * as response from "../../assets/mockData/response.json";

@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.scss"]
})
export class MainComponent {
    isShownResults = false;
    response = JSON.parse(JSON.stringify(response));
    showResults(value: boolean): void {
        this.isShownResults = value;
        console.log(this.response);
    }
}

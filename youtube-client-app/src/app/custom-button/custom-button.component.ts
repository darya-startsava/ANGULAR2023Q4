import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

@Component({
    standalone: true,
    imports: [MatButtonModule],
    selector: "app-custom-button",
    templateUrl: "./custom-button.component.html",
    styleUrls: ["./custom-button.component.scss"]
})
export class CustomButtonComponent {}

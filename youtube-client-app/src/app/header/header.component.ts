import { Component } from "@angular/core";

import { CustomButtonComponent } from "../custom-button/custom-button.component";

@Component({
    standalone: true,
    imports: [CustomButtonComponent],
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {}

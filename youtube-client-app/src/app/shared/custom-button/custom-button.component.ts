import { Component, Input, TemplateRef } from "@angular/core";

@Component({
    selector: "app-custom-button",
    templateUrl: "./custom-button.component.html",
    styleUrls: ["./custom-button.component.scss"]
})
export class CustomButtonComponent {
    @Input() template: TemplateRef<HTMLElement>;
}

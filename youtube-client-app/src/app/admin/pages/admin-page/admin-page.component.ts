import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

import { dateBeforeValidator } from "../../directives/date-before.directive";

@Component({
    selector: "app-admin-page",
    templateUrl: "./admin-page.component.html",
    styleUrls: ["./admin-page.component.scss"]
})
export class AdminPageComponent {
    createCardForm = this.formBuilder.group({
        title: [
            "",
            [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(20)
            ]
        ],
        description: ["", [Validators.maxLength(255)]],
        image: ["", [Validators.required]],
        video: ["", [Validators.required]],
        date: ["", [Validators.required, dateBeforeValidator()]]
    });

    constructor(private formBuilder: FormBuilder) {}

    onSubmit() {
        console.log(this.createCardForm);
    }

    get title() {
        return this.createCardForm.get("title");
    }

    get description() {
        return this.createCardForm.get("description");
    }

    get image() {
        return this.createCardForm.get("image");
    }

    get video() {
        return this.createCardForm.get("video");
    }

    get date() {
        return this.createCardForm.get("date");
    }
}

import { Component } from "@angular/core";
import {
    FormArray,
    FormBuilder,
    FormControl,
    Validators
} from "@angular/forms";

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
        date: ["", [Validators.required, dateBeforeValidator()]],
        tags: this.formBuilder.array([
            new FormControl("", [Validators.required])
        ])
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

    get tags(): FormArray {
        return this.createCardForm.get("tags") as FormArray;
    }

    newTag(): FormControl {
        return new FormControl("", [Validators.required]);
    }

    addTag(): void {
        if (this.tags.length <= 4) {
            this.tags.push(this.newTag());
        }
    }

    removeTag(i: number) {
        this.tags.removeAt(i);
    }
}

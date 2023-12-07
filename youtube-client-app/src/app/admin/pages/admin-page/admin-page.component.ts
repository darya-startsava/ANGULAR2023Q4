import { Component } from "@angular/core";
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormControl,
    Validators
} from "@angular/forms";
import { Store } from "@ngrx/store";
import { createCard } from "src/app/redux/actions/card.actions";

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

    constructor(
        private formBuilder: FormBuilder,
        private store: Store
    ) {}

    onSubmit(): void {
        this.store.dispatch(
            createCard({
                id: `customCard${Date.now()}`,
                createdCard: this.createCardForm.value
            })
        );
        this.resetForm();
    }

    get title(): AbstractControl {
        return this.createCardForm.get("title");
    }

    get description(): AbstractControl {
        return this.createCardForm.get("description");
    }

    get image(): AbstractControl {
        return this.createCardForm.get("image");
    }

    get video(): AbstractControl {
        return this.createCardForm.get("video");
    }

    get date(): AbstractControl {
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

    removeTag(i: number): void {
        this.tags.removeAt(i);
    }

    resetForm(): void {
        this.tags.clear();
        this.createCardForm.reset();
        this.addTag();
    }
}

import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Component({
    selector: "app-admin-page",
    templateUrl: "./admin-page.component.html",
    styleUrls: ["./admin-page.component.scss"]
})
export class AdminPageComponent {
    createCardForm = this.formBuilder.group({
        title: [""],
        description: [""],
        image: [""],
        linkVideo: [""]
    });

    constructor(private formBuilder: FormBuilder) {}

    onSubmit() {
        console.log("The form was created");
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

    get linkVideo() {
        return this.createCardForm.get("linkVideo");
    }
}

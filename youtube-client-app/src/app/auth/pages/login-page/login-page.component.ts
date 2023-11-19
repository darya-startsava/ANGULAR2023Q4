import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Component({
    selector: "app-login-page",
    templateUrl: "./login-page.component.html",
    styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent {
    loginForm = this.formBuilder.group({ login: [""], password: [""] });
    constructor(private formBuilder: FormBuilder) {}

    onSubmit() {
        console.log(this.loginForm.value);
    }
}

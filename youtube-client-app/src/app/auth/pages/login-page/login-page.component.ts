import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

import { LoginService } from "../../services/login.service";

@Component({
    selector: "app-login-page",
    templateUrl: "./login-page.component.html",
    styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent {
    loginForm = this.formBuilder.group({ login: [""], password: [""] });
    constructor(
        private formBuilder: FormBuilder,
        private loginService: LoginService,
        private router: Router
    ) {}

    onSubmit() {
        this.loginService.login();
        this.router.navigate(["/main"]);
    }
}

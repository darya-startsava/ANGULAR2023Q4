import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { strongPasswordValidator } from "../../directives/strong-password.directive";
import { LoginService } from "../../services/login.service";

@Component({
    selector: "app-login-page",
    templateUrl: "./login-page.component.html",
    styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent {
    loginForm = this.formBuilder.group({
        login: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, strongPasswordValidator()]]
    });
    constructor(
        private formBuilder: FormBuilder,
        private loginService: LoginService,
        private router: Router
    ) {}

    onSubmit(): void {
        this.loginService.loginToAccount(this.login.value);
        this.router.navigate(["/main"]);
    }

    get login(): AbstractControl {
        return this.loginForm.get("login");
    }

    get password(): AbstractControl {
        return this.loginForm.get("password");
    }
}

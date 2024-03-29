import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { provideRouter } from "@angular/router";

import { SharedModule } from "../shared/shared.module";
import { routes } from "./auth.routes";
import { LoginPageComponent } from "./pages/login-page/login-page.component";

@NgModule({
    declarations: [LoginPageComponent],
    imports: [CommonModule, ReactiveFormsModule, SharedModule],
    exports: [LoginPageComponent],
    providers: [provideRouter(routes)]
})
export class AuthModule {}

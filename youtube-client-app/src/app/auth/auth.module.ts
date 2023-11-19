import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "../shared/shared.module";
import { LoginPageComponent } from "./pages/login-page/login-page.component";

@NgModule({
    declarations: [LoginPageComponent],
    imports: [CommonModule, ReactiveFormsModule, SharedModule],
    exports: [LoginPageComponent]
})
export class AuthModule {}

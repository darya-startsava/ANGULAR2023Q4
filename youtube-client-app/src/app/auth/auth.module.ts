import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "../shared/shared.module";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { LoginService } from "./services/login.service";

@NgModule({
    declarations: [LoginPageComponent],
    imports: [CommonModule, ReactiveFormsModule, SharedModule],
    exports: [LoginPageComponent],
    providers: [LoginService]
})
export class AuthModule {}

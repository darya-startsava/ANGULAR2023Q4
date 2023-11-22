import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { provideRouter } from "@angular/router";

import { SharedModule } from "../shared/shared.module";
import { routes } from "./admin.routes";
import { AdminPageComponent } from "./pages/admin-page/admin-page.component";

@NgModule({
    declarations: [AdminPageComponent],
    imports: [CommonModule, SharedModule, ReactiveFormsModule],
    providers: [provideRouter(routes)]
})
export class AdminModule {}

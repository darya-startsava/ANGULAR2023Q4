import { Routes } from "@angular/router";

import { LoginPageComponent } from "./auth/pages/login-page/login-page.component";
import { NotFoundPageComponent } from "./core/pages/not-found-page/not-found-page.component";
import { DetailedInformationPageComponent } from "./youtube/pages/detailed-information-page/detailed-information-page.component";
import { MainPageComponent } from "./youtube/pages/main-page/main-page.component";

export const routes: Routes = [
    { path: "", redirectTo: "/auth", pathMatch: "full" },
    { path: "auth", component: LoginPageComponent },
    { path: "main", component: MainPageComponent },
    { path: "details", component: DetailedInformationPageComponent },
    { path: "**", component: NotFoundPageComponent }
];

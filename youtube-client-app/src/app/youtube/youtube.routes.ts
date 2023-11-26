import { Routes } from "@angular/router";

import { authGuard } from "../auth/guards/auth.guard";
import { DetailedInformationPageComponent } from "./pages/detailed-information-page/detailed-information-page.component";
import { MainPageComponent } from "./pages/main-page/main-page.component";

export const routes: Routes = [
    { path: "", component: MainPageComponent, canActivate: [authGuard] },
    {
        path: ":id",
        component: DetailedInformationPageComponent,
        canActivate: [authGuard]
    }
];

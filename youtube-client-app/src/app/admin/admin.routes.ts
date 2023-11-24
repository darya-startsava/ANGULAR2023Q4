import { Routes } from "@angular/router";

import { authGuard } from "../auth/guards/auth.guard";
import { AdminPageComponent } from "./pages/admin-page/admin-page.component";

export const routes: Routes = [
    { path: "", component: AdminPageComponent, canActivate: [authGuard] }
];

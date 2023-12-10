import { Routes } from "@angular/router";

import { authGuard } from "../auth/guards/auth.guard";
import { FavoritePageComponent } from "./pages/favorite-page/favorite-page.component";

export const routes: Routes = [
    { path: "", component: FavoritePageComponent, canActivate: [authGuard] }
];

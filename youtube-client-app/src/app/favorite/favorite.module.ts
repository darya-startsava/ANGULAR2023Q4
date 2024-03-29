import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { provideRouter, RouterLink } from "@angular/router";

import { SharedModule } from "../shared/shared.module";
import { routes } from "./favorite.routes";
import { FavoritePageComponent } from "./pages/favorite-page/favorite-page.component";

@NgModule({
    declarations: [FavoritePageComponent],
    imports: [CommonModule, SharedModule, RouterLink],
    providers: [provideRouter(routes)]
})
export class FavoriteModule {}

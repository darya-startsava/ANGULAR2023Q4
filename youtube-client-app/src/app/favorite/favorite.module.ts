import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { provideRouter, RouterLink } from "@angular/router";

import { SharedModule } from "../shared/shared.module";
import { routes } from "./favorite.routes";
import { FavoritePageComponent } from "./pages/favorite-page/favorite-page.component";
import { FavoriteItemsComponent } from "./components/favorite-items/favorite-items.component";
import { FavoriteItemComponent } from "./components/favorite-item/favorite-item.component";

@NgModule({
    declarations: [
        FavoritePageComponent,
        FavoriteItemsComponent,
        FavoriteItemComponent
    ],
    imports: [CommonModule, SharedModule, RouterLink],
    providers: [provideRouter(routes)]
})
export class FavoriteModule {}

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

import { SharedModule } from "../shared/shared.module";
import { SearchItemComponent } from "./components/search-item/search-item.component";
import { SearchResultsComponent } from "./components/search-results/search-results.component";
import { ColoredBorderDirective } from "./directives/colored-border.directive";
import { MainPageComponent } from "./pages/main-page/main-page.component";

@NgModule({
    declarations: [
        MainPageComponent,
        SearchItemComponent,
        SearchResultsComponent,
        ColoredBorderDirective,
    ],
    imports: [CommonModule, SharedModule, MatCardModule, MatIconModule],
    exports: [MainPageComponent]
})
export class YoutubeModule {}

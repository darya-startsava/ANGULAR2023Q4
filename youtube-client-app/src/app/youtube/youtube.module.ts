import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

import { SharedModule } from "../shared/shared.module";
import { SearchItemComponent } from "./components/search-item/search-item.component";
import { SearchResultsComponent } from "./components/search-results/search-results.component";
import { ColoredBorderDirective } from "./directives/colored-border.directive";
import { DetailedInformationPageComponent } from "./pages/detailed-information-page/detailed-information-page.component";
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { ItemStatisticsComponent } from "./components/item-statistics/item-statistics.component";

@NgModule({
    declarations: [
        MainPageComponent,
        SearchItemComponent,
        SearchResultsComponent,
        ColoredBorderDirective,
        DetailedInformationPageComponent,
        ItemStatisticsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        MatCardModule,
        MatIconModule,
        RouterLink,
        DatePipe
    ],
    exports: [MainPageComponent, DetailedInformationPageComponent]
})
export class YoutubeModule {}

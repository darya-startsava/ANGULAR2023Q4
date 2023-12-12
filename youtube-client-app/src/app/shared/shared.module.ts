import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";

import { CustomButtonComponent } from "./components/custom-button/custom-button.component";
import { ItemStatisticsComponent } from "./components/item-statistics/item-statistics.component";
import { SearchItemComponent } from "./components/search-item/search-item.component";
import { SearchResultsComponent } from "./components/search-results/search-results.component";
import { ColoredBorderDirective } from "./directives/colored-border.directive";
import { FilterPipe } from "./pipes/filter.pipe";

@NgModule({
    declarations: [
        CustomButtonComponent,
        ItemStatisticsComponent,
        SearchItemComponent,
        SearchResultsComponent,
        ColoredBorderDirective,
        FilterPipe
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        RouterModule.forChild([])
    ],
    exports: [
        CustomButtonComponent,
        ItemStatisticsComponent,
        SearchItemComponent,
        SearchResultsComponent,
        ColoredBorderDirective,
        FilterPipe,
        RouterModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule
    ]
})
export class SharedModule {}

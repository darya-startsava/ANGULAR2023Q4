import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { ColoredBorderDirective } from "./shared/directives/colored-border.directive";
import { FilterPipe } from "./shared/pipes/filter.pipe";
import { SharedModule } from "./shared/shared.module";
import { SearchItemComponent } from "./youtube/components/search-item/search-item.component";
import { SearchResultsComponent } from "./youtube/components/search-results/search-results.component";

@NgModule({
    declarations: [
        AppComponent,
        SearchItemComponent,
        SearchResultsComponent,
        FilterPipe,
        ColoredBorderDirective
    ],
    imports: [
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CoreModule,
        SharedModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}

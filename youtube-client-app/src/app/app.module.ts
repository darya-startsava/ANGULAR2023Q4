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
import { SortSettingsComponent } from "./header/filters/sort-settings.component";
import { HeaderComponent } from "./header/header.component";
import { HeaderInputComponent } from "./header/input/header-input.component";
import { SearchItemComponent } from "./search/search-item/search-item.component";
import { SearchResultsComponent } from "./search/search-results/search-results.component";
import { ColoredBorderDirective } from "./shared/directives/colored-border.directive";
import { FilterPipe } from "./shared/pipes/filter.pipe";
import { SharedModule } from "./shared/shared.module";

@NgModule({
    declarations: [
        AppComponent,
        SearchItemComponent,
        SearchResultsComponent,
        SortSettingsComponent,
        FilterPipe,
        ColoredBorderDirective,
        HeaderComponent
    ],
    imports: [
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        HttpClientModule,
        HeaderInputComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}

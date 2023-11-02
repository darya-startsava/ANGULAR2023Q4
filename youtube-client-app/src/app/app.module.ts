import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { CustomButtonComponent } from "./custom-button/custom-button.component";
import { HeaderComponent } from "./header/header.component";
import { MainComponent } from "./main/main.component";
import { OrderByPipe } from "./pipes/order-by.pipe";
import { SearchItemComponent } from "./search/search-item/search-item.component";
import { SearchResultsComponent } from "./search/search-results/search-results.component";
import { SortSettingsComponent } from "./sort-settings/sort-settings.component";

@NgModule({
    declarations: [
        AppComponent,
        SearchItemComponent,
        SearchResultsComponent,
        MainComponent,
        SortSettingsComponent,
        OrderByPipe
    ],
    imports: [
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HeaderComponent,
        CustomButtonComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}

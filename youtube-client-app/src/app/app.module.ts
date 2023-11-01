import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { CustomButtonComponent } from "./custom-button/custom-button.component";
import { HeaderComponent } from "./header/header.component";
import { MainComponent } from "./main/main.component";
import { SearchItemComponent } from "./search/search-item/search-item.component";
import { SearchResultsComponent } from "./search/search-results/search-results.component";

@NgModule({
    declarations: [
        AppComponent,
        SearchItemComponent,
        SearchResultsComponent,
        MainComponent
    ],
    imports: [
        MatCardModule,
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

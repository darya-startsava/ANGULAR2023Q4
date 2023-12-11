import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { provideRouter, RouterLink } from "@angular/router";

import { SharedModule } from "../shared/shared.module";
import { SearchItemComponent } from "./components/search-item/search-item.component";
import { SearchResultsComponent } from "./components/search-results/search-results.component";
import { DetailedInformationPageComponent } from "./pages/detailed-information-page/detailed-information-page.component";
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { routes } from "./youtube.routes";

@NgModule({
    declarations: [
        MainPageComponent,
        SearchItemComponent,
        SearchResultsComponent,
        DetailedInformationPageComponent
    ],
    imports: [CommonModule, SharedModule, RouterLink, DatePipe],
    providers: [provideRouter(routes)]
})
export class YoutubeModule {}

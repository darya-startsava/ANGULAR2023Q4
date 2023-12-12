import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { provideRouter } from "@angular/router";

import { SharedModule } from "../shared/shared.module";
import { DetailedInformationPageComponent } from "./pages/detailed-information-page/detailed-information-page.component";
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { routes } from "./youtube.routes";

@NgModule({
    declarations: [
        MainPageComponent,
        DetailedInformationPageComponent
    ],
    imports: [CommonModule, SharedModule, DatePipe],
    providers: [provideRouter(routes)]
})
export class YoutubeModule {}

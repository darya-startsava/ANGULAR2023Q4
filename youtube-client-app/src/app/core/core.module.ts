import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { SharedModule } from "../shared/shared.module";
import { SortSettingsComponent } from "./components/header/filters/sort-settings.component";
import { HeaderComponent } from "./components/header/header.component";
import { HeaderInputComponent } from "./components/header/input/header-input.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";

@NgModule({
    declarations: [
        HeaderComponent,
        SortSettingsComponent,
        NotFoundPageComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        HeaderInputComponent
    ],
    exports: [HeaderComponent, HeaderInputComponent, NotFoundPageComponent]
})
export class CoreModule {}

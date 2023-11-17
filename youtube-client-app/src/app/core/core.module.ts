import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";

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
    imports: [CommonModule, FormsModule, MatButtonModule, HeaderInputComponent],
    exports: [HeaderComponent, HeaderInputComponent, NotFoundPageComponent]
})
export class CoreModule {}

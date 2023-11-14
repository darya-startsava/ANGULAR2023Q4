import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";

import { SortSettingsComponent } from "./components/header/filters/sort-settings.component";
import { HeaderComponent } from "./components/header/header.component";
import { HeaderInputComponent } from "./components/header/input/header-input.component";

@NgModule({
    declarations: [HeaderComponent, SortSettingsComponent],
    imports: [CommonModule, FormsModule, MatButtonModule, HeaderInputComponent],
    exports: [HeaderComponent, HeaderInputComponent]
})
export class CoreModule {}

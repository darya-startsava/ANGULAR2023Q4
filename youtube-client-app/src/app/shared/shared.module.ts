import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

import { CustomButtonComponent } from "./custom-button/custom-button.component";
import { FilterPipe } from "./pipes/filter.pipe";

@NgModule({
    declarations: [CustomButtonComponent, FilterPipe],
    imports: [CommonModule, MatButtonModule],
    exports: [CustomButtonComponent, FilterPipe]
})
export class SharedModule {}

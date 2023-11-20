import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

import { CustomButtonComponent } from "./custom-button/custom-button.component";

@NgModule({
    declarations: [CustomButtonComponent],
    imports: [CommonModule, MatButtonModule],
    exports: [CustomButtonComponent]
})
export class SharedModule {}

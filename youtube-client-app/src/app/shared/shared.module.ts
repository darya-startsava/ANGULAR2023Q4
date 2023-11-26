import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

import { CustomButtonComponent } from "./components/custom-button/custom-button.component";
import { FilterPipe } from "./pipes/filter.pipe";

@NgModule({
    declarations: [CustomButtonComponent, FilterPipe],
    imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
    exports: [
        CustomButtonComponent,
        FilterPipe,
        MatButtonModule,
        MatCardModule,
        MatIconModule
    ]
})
export class SharedModule {}

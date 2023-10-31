import { Component, EventEmitter, Output } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { CustomButtonComponent } from "../custom-button/custom-button.component";

@Component({
    standalone: true,
    imports: [CustomButtonComponent, MatInputModule, MatFormFieldModule],
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
    @Output() showSearchResults = new EventEmitter<boolean>();
    onSearch(): void {
        this.showSearchResults.emit(true);
    }
}

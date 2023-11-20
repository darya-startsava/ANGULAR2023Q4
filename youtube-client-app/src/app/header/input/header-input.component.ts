import { Component, EventEmitter, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { SearchResultService } from "src/app/services/search-result.service";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
    standalone: true,
    imports: [
        SharedModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule
    ],
    selector: "app-header-input",
    templateUrl: "./header-input.component.html",
    styleUrls: ["./header-input.component.scss"]
})
export class HeaderInputComponent {
    @Output() toggleSortSettings = new EventEmitter();

    constructor(private searchResultService: SearchResultService) {}
    onSearch(): void {
        this.searchResultService.getData();
    }

    onToggleSortSettings(): void {
        this.toggleSortSettings.emit();
    }
}

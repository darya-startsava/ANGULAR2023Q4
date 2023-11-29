import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";
import { AuthModule } from "src/app/auth/auth.module";
import { LoginService } from "src/app/auth/services/login.service";
import { SharedModule } from "src/app/shared/shared.module";
import { SearchResultService } from "src/app/youtube/services/search-result.service";

@Component({
    standalone: true,
    imports: [
        SharedModule,
        AuthModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        FormsModule
    ],
    selector: "app-header-input",
    templateUrl: "./header-input.component.html",
    styleUrls: ["./header-input.component.scss"]
})
export class HeaderInputComponent {
    public searchInput = "";
    @Output() toggleSortSettings = new EventEmitter();

    constructor(
        private searchResultService: SearchResultService,
        private loginService: LoginService,
        private router: Router
    ) {}
    search(): void {
        this.searchResultService.setInput(this.searchInput);
        this.router.navigate(["/main"]);
    }

    onToggleSortSettings(): void {
        this.toggleSortSettings.emit();
    }

    onLogout(): void {
        this.loginService.logout();
        this.router.navigate(["/auth"]);
    }

    onGoToAdminPage(): void {
        this.router.navigate(["/admin"]);
    }
}

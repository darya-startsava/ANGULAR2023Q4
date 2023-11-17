import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideRouter, RouterLink, RouterOutlet } from "@angular/router";

import { AppComponent } from "./app.component";
import { routes } from "./app.routes";
import { AuthModule } from "./auth/auth.module";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { YoutubeModule } from "./youtube/youtube.module";

@NgModule({
    declarations: [AppComponent],
    imports: [
        FormsModule,
        MatButtonModule,
        MatIconModule,
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        SharedModule,
        YoutubeModule,
        AuthModule,
        HttpClientModule,
        RouterOutlet,
        RouterLink
    ],
    providers: [provideRouter(routes)],
    bootstrap: [AppComponent]
})
export class AppModule {}

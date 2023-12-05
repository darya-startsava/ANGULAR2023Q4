import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideRouter, RouterOutlet } from "@angular/router";
import { StoreModule } from "@ngrx/store";

import { AdminModule } from "./admin/admin.module";
import { AppComponent } from "./app.component";
import { routes } from "./app.routes";
import { AuthModule } from "./auth/auth.module";
import { CoreModule } from "./core/core.module";
import { sourceReducer } from "./redux/reducers/source.reducer";
import { SharedModule } from "./shared/shared.module";
import { UrlShortenerInterceptor } from "./youtube/interceptors/url-shortener.interceptor";

@NgModule({
    declarations: [AppComponent],
    imports: [
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        SharedModule,
        AuthModule,
        AdminModule,
        HttpClientModule,
        RouterOutlet,
        StoreModule.forRoot({ source: sourceReducer })
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UrlShortenerInterceptor,
            multi: true
        },
        provideRouter(routes)
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

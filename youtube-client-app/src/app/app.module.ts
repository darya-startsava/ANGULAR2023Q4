import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideRouter, RouterOutlet } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { routerReducer, StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";

import { AdminModule } from "./admin/admin.module";
import { AppComponent } from "./app.component";
import { routes } from "./app.routes";
import { AuthModule } from "./auth/auth.module";
import { CoreModule } from "./core/core.module";
import { SearchEffects } from "./redux/effects/search.effects";
import { SearchVideoByIdEffects } from "./redux/effects/searchVideoById.effects";
import { currentPageReducer } from "./redux/reducers/currentPage.reducer";
import { currentVideoReducer } from "./redux/reducers/currentVideo.reducer";
import { paginationReducer } from "./redux/reducers/pagination.reduser";
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
        StoreModule.forRoot({
            source: sourceReducer,
            currentPageItems: currentPageReducer,
            currentVideo: currentVideoReducer,
            pagination: paginationReducer,
            router: routerReducer
        }),
        EffectsModule.forRoot([SearchEffects, SearchVideoByIdEffects]),
        StoreRouterConnectingModule.forRoot()
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

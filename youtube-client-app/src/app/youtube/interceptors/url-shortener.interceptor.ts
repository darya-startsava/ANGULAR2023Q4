import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class UrlShortenerInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const modifiedRequest = request.clone({
            url: this.addKey(request.url)
        });
        return next.handle(modifiedRequest);
    }

    addKey(url: string) {
        const urlStart = "https://www.googleapis.com/youtube/v3/";
        const key = process.env["API_KEY"];
        return `${urlStart}${url}?$key=${key}`;
    }
}

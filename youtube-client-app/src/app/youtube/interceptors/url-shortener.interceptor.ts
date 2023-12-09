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

    private addKey(url: string): string {
        const key = "AIzaSyBERrQKVy2xM8NFbZB-RDqtLv4VZ1xgDtg";
        return `${url}?$key=${key}`;
    }
}

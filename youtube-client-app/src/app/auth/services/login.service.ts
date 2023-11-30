import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class LoginService {
    public isLoggedIn$ = new BehaviorSubject<boolean>(false);

    constructor() {
        this.isLoggedIn$.next(this.checkInitialLoginState());
    }

    private checkInitialLoginState(): boolean {
        return !!localStorage.getItem("token");
    }
    login(): void {
        localStorage.setItem("token", "token");
        this.isLoggedIn$.next(true);
    }

    logout(): void {
        localStorage.removeItem("token");
        this.isLoggedIn$.next(false);
    }
}

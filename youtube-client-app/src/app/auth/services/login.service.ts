import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class LoginService {
    public isLoggedIn$ = new BehaviorSubject<boolean>(false);
    public login: string;

    constructor() {
        this.isLoggedIn$.next(this.checkInitialLoginState());
    }

    private checkInitialLoginState(): boolean {
        return !!localStorage.getItem("token");
    }
    loginToAccount(login: string): void {
        localStorage.setItem("token", "token");
        this.isLoggedIn$.next(true);
        this.login = login;
    }

    logoutFromAccount(): void {
        localStorage.removeItem("token");
        this.isLoggedIn$.next(false);
        this.login = "";
    }
}

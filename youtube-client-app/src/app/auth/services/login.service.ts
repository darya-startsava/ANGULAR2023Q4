import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class LoginService {
    login(): void {
        localStorage.setItem("token", "token");
    }

    logout(): void {
        localStorage.removeItem("token");
    }
}

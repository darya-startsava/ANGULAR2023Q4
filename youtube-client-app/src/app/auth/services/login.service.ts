import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class LoginService {
    login() {
        localStorage.setItem("token", "token");
    }

    logout() {
        localStorage.removeItem("token");
    }
}

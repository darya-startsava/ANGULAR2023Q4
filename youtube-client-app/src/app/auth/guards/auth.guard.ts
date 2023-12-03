import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map } from "rxjs";

import { LoginService } from "../services/login.service";

export const authGuard: CanActivateFn = () => {
    const router = inject(Router);
    return inject(LoginService).isLoggedIn$.pipe(
        map((isLogged) => (isLogged ? true : router.parseUrl("/auth")))
    );
};

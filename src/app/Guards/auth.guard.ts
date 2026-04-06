import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../Services/Auth/auth.service";
import { inject } from "@angular/core";

export const AuthGuard : CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router)

    if(authService.isLoggedIn()){
        return true;
    }
    else {
        router.navigate(['/auth/login']);
        return false;
    }
};
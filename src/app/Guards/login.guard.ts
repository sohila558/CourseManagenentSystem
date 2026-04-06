import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../Services/Auth/auth.service";

export const LoginGuard : CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isLoggedIn()) {
        const user = authService.getUserFromStorage();

        if (user?.role?.toLowerCase() === 'admin') {
            router.navigate(['/admin']);
        } 
        else {
            router.navigate(['/student']);
        }
        return false;
    }
    return true;
};
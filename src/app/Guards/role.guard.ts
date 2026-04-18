import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../Services/Auth/auth.service";
import { Store } from "@ngrx/store";
import { selectUserRole } from "../Store/Auth/auth.selector";
import { map, take } from "rxjs";

export const RoleGuard: CanActivateFn = (route, state) => {
    const store = inject(Store);
    const router = inject(Router);
    const expectedRole = route.data['role'];

    return store.select(selectUserRole).pipe(
        take(1),
        map(role => {

            let currentRole = role;
            if (!currentRole) {
                const userJson = localStorage.getItem('user');
                if (userJson) {
                    currentRole = JSON.parse(userJson).role;
                }
            }
                if (currentRole?.toLowerCase() === expectedRole?.toLowerCase()) {
                    return true;
                }
                else {
                    router.navigate(['/unauthorized']);
                    return false;
                }
            }
        )
    )
};
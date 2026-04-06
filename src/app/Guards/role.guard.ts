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
                console.log('Role from Store:', role);
                console.log('Expected Role:', expectedRole);
                console.log('Full Route Snapshot:', route);

                if (currentRole === expectedRole) {
                    return true;
                }
                else {
                    console.warn('Access Denied: Roles do not match');
                    router.navigate(['/unauthorized']);
                    return false;
                }
            }
        )
    )
};
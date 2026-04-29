// Effect is the Middleware in .Net when i send request it handle it 
// (when i dispatch any action it goes to talk to the API and send the response to the store)

import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../Services/Auth/auth.service";
import { Router } from "@angular/router";
import { login, loginFailure, loginSuccess, logout } from "./auth.action";
import { catchError, exhaustMap, map, mergeMap, of, tap } from "rxjs";

@Injectable()
export class AuthEffect{
    
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() => 
        this.actions$.pipe(
            ofType(login),
            // exhaustMap => Prevent Double Clicks
            exhaustMap((action) =>
                this.authService.login(action.email, action.password).pipe(
                    map((user) => loginSuccess({user})),
                    catchError((error) => of(loginFailure({error : error.error?.message || 'Login Failed!'})))
                )
            )
        )   
    );

    loginSuccess$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loginSuccess),
            // tap => Remember!! we using it when we won't change data, just saving data in LocalStorage 
            tap(({user}) => {
                // Save userInfo in LocalStorage 
                localStorage.setItem('user', JSON.stringify(user));  
                
                const role = user.role?.trim().toLowerCase();

                console.log("Current User Role after processing:", role);
                
                if(role === 'admin'){
                    this.router.navigate(['/admin']);
                }
                else if (role === 'instructor'){
                    this.router.navigate(['/instructor'])
                }
                else{
                    this.router.navigate(['/student']);
                }
            })
        ),
        // to not dispatch any action (For NgRx do not wait any return)
        {dispatch : false}
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(logout),
            tap(() =>{
                localStorage.removeItem('user');
                this.router.navigate(['/auth'])
            })
        ),
        {dispatch : false}
    );
    
}
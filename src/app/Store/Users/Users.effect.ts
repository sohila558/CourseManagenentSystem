import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AdminService } from "../../Services/Admin/admin.service";
import { addUser, addUserFailed, addUserSuccess, deleteUser, deleteUSerFailed, deletUserSuccess, loadUsers, loadUsersFailed, loadUsersSuccess, updateUser, updateUserFailed, updateUserSuccess } from "./Users.action";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";

@Injectable()
export class UserEffects{
    actions$ = inject(Actions);
    adminService = inject(AdminService);

    loadUsers$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadUsers),
            switchMap(() => 
                this.adminService.getAllUsers().pipe(
                    map(users => loadUsersSuccess({ users })),
                    catchError(error => of(loadUsersFailed({ error })))
                )
            )
        )
    );

    addUser$ = createEffect(() => 
        this.actions$.pipe(
            ofType(addUser),
            mergeMap(({ user }) =>
                this.adminService.addUser(user).pipe(
                    map(newUser => addUserSuccess({ user : newUser })),
                    catchError(error => of(addUserFailed ({ error })))
                )
            )
        )
    );

    updateUser$ = createEffect(() => 
        this.actions$.pipe(
            ofType(updateUser),
            mergeMap((action) => 
                this.adminService.updateUser(action.user).pipe(
                    map((updateUser) => updateUserSuccess({ user : updateUser})),
                    catchError(error => of(updateUserFailed ({ error })))
                )
            )
        )
    );

    deleteUser$ = createEffect(() => 
        this.actions$.pipe(
            ofType(deleteUser),
            mergeMap((action) =>
                this.adminService.deleteUser(action.id).pipe(
                    map(() => deletUserSuccess({id : action.id})),
                    catchError(error => of(deleteUSerFailed ({ error })))
                )
            )
        )
    );
}
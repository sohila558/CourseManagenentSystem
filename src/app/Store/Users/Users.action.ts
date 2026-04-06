import { createAction, props } from "@ngrx/store";
import { User } from "../../Models/user";

export const loadUsers = createAction('[User] Load All Users');
export const loadUsersSuccess = createAction('[User] Load All Users Success', props<{users : User[]}>());
export const loadUsersFailed = createAction('[User] Load All Users Failed', props<{error : any}>());

export const addUser = createAction('[User] Add New User', props<{user : User}>());
export const addUserSuccess = createAction('[User] Add New User Success', props<{user : User}>());
export const addUserFailed = createAction('[User] Add New User Failed', props<{error : any}>());

export const updateUser = createAction('[User] Update User', props<{user : User}>());
export const updateUserSuccess = createAction('[User] Update User Success', props<{user : User}>());
export const updateUserFailed = createAction('[User] Update User Failed', props<{error : any}>());

export const deleteUser = createAction('[User] Delete User', props<{id : string}>());
export const deletUserSuccess = createAction('[User] Delete User Success', props<{id : string}>());
export const deleteUSerFailed = createAction('[User] Delete USer Failed', props<{error : any}>());
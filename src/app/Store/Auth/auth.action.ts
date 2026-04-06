import { createAction, props } from "@ngrx/store";
import { User } from "../../Models/user";

// Need Email & Password to login.
export const login = createAction("[Auth] Login", props<{email : string, password : string}>());

// When login successed we take the user information from API.
export const loginSuccess = createAction("[Auth] Login Success", props<{user : User}>());

// When login failed we send error message.
export const loginFailure = createAction("[Auth] Login Failure", props<{error : string}>());

export const logout = createAction("[Auth] Logout");

// Restoring User Information From Local Storage When Refresh Page. 
    // *If we found a Token in the localstorage when the App is open or refreshed we send the User
    // back to the Store. 
export const restoreUserInformation = createAction("[Auth] Restore User", props<{user : User}>());
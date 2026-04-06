import { createReducer, on } from "@ngrx/store";
import { User } from "../../Models/user";
import { login, loginFailure, loginSuccess, logout, restoreUserInformation } from "./auth.action";

export interface AuthState{
    user : User | null;
    isLoading : boolean;
    error : string | null;
}

export const initialState : AuthState = {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    isLoading: false,
    error: null
}

export const authReducer = createReducer(
    initialState,

    on(login, (state) => ({
        // When the Login start we set Loading to true.
        ...state,
        isLoading: true,
        error: null
    })),

    on(loginSuccess, (state, {user}) => ({
        // When the Login Success we store the UserInfo in the store and set the Loading to False.
        ...state,
        user,
        isLoading: false,
        error: null
    })),

    on(loginFailure, (state, {error}) => ({
        // when the Login Fail we send error message and turn off the loading.
        ...state,
        isLoading: false,
        error : error
    })),

    // When logingout we set the state to it's initialState
    on(logout, () => initialState),

    on(restoreUserInformation, (state, {user}) => ({
        ...state,
        user,
        isLoading: false,
        error: null
    }))
)
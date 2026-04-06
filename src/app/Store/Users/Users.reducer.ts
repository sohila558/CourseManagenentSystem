import { createReducer, on } from "@ngrx/store";
import { User } from "../../Models/user";
import { addUserSuccess, deletUserSuccess, loadUsers, loadUsersSuccess, updateUserSuccess } from "./Users.action";

export interface UserState {
    users : User[];
    loading : boolean;
    error : any;
}

export const initialState : UserState = {
    users : [],
    loading : false,
    error : null
}

export const userReducer = createReducer(
    initialState,
    
    on(loadUsers, state => ({
        ...state,
        loading : true,
        error : null
    })),

    on(loadUsersSuccess, (state, { users }) => ({
        ...state,
        loading : false,
        users,
        error : null
    })),

    on(addUserSuccess, (state, { user }) => ({
        ...state,
        users : [...state.users, user],
        error : null
    })),

    on(updateUserSuccess, (state, { user }) => ({
        ...state,
        users : state.users.map(u => u.id === user.id ? user : u),
        error : null
    })),

    on(deletUserSuccess, (state, { id }) => ({
        ...state,
        users : state.users.filter(u => u.id !== id),
        error : null
    }))
)
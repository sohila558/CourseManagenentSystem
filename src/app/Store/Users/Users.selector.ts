import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./Users.reducer";

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectAllUsers = createSelector(
    selectUserState,
    (state) => state.users
);

export const selectUserLoading = createSelector(
    selectUserState,
    (state) => state.loading
);

export const selectAllStudents = createSelector(
    selectAllUsers,
    (users) => users.filter(u => u.role === 'Student').length
);

export const selectAllInstructor = createSelector(
    selectAllUsers,
    (users) => users.filter(u => u.role === 'Instructor').length
);
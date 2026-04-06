// Store is the DbContext in .Net 
// So Selector is the Linq Query in .Net and it helps me to use Encapsulation
// There is also another Feature "Memoization" it's look like Caching in .Net 

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";

// Get Everything About Auth From The Store
export const selectAuthFeature = createFeatureSelector<AuthState>('auth');

// Get Specific Information About Auth(Filteration For "createFeatureSelector")

// Get All User Information
export const selectCurrentUser = createSelector(
    selectAuthFeature,
    (state: AuthState) => state.user
);

// Get User Role "For Guards and Navbar"
export const selectUserRole = createSelector(
    selectAuthFeature,
    (state: AuthState) => state.user?.role
);

// Making sure that the user is Loggedin or not
export const selectIsAuthenticated = createSelector(
    selectAuthFeature,
    (state: AuthState) => !!state.user
    // !! => true or false
);

// Getting the error message if loggin Failed
export const selectAuthError = createSelector(
    selectAuthFeature,
    (state: AuthState) => state.error
);

// Getting Loading state
export const selectAuthLoading = createSelector(
    selectAuthFeature,
    (state: AuthState) => state.isLoading
);


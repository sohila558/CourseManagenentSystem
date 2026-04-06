import { createReducer, on } from "@ngrx/store";
import { Enrollment } from "../../Models/enrollments";
import { cancelEnrollmentSuccess, enrollStudentSuccess, loadEnrollments, loadEnrollmentsSuccess } from "./enrollment.action";

export interface EnrollmentState {
    enrollments : Enrollment[];
    isLoading : boolean;
    error : any;
}

export const initialState : EnrollmentState = {
    enrollments : [],
    isLoading : false,
    error : null
}

export const enrollReducer = createReducer (
    initialState,

    on(loadEnrollments, state => ({
        ...state,
        isLoading : true,
        error : null   
    })), 

    on(loadEnrollmentsSuccess, (state, { enrollments }) => ({
        ...state,
        isLoading : false,
        enrollments,
        error : null
    })), 

    on(enrollStudentSuccess, (state, { enrollment }) => ({
        ...state,
        enrollments : [...state.enrollments, enrollment],
        error : null
    })),

    on(cancelEnrollmentSuccess, (state, { enrollmentId }) => ({
        ...state,
        enrollments : state.enrollments.filter(e => e.id !== enrollmentId),
        error : null
    }))
)
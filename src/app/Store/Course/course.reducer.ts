import { createReducer, on } from "@ngrx/store";
import { Course } from "../../Models/course";
import { addCourseSuccess, deleteCourseSuccess, loadCourses, loadCoursesSuccess, updateCourseSuccess } from "./course.action";

export interface CourseState{
    courses : Course[];
    isLoading : boolean;
    error : any;
}

export const initialState : CourseState = {
    courses : [],
    isLoading : false,
    error : null
}

export const courseReducer = createReducer(
    initialState,

    on(loadCourses, state => ({
        ...state,
        isLoading : true,
        error : null
    })),

    on(loadCoursesSuccess, (state, { courses }) => ({
        ...state,
        isLoading : false,
        courses,
        error : null
    })),

    on(addCourseSuccess, (state, { course }) => ({
        ...state,
        courses : [...state.courses, course],
        error : null
    })),

    on(updateCourseSuccess, (state, { course }) => ({
        ...state,
        courses : state.courses.map(c => c.id === course.id ? course : c),
        error : null
    })),

    on(deleteCourseSuccess, (state, { id }) => ({
        ...state,
        courses : state.courses.filter(c => c.id !== id),
        error : null
    }))
) 
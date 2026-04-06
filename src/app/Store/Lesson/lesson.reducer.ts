import { createReducer, on } from "@ngrx/store";
import { Lesson } from "../../Models/lesson";
import { addLessonSuccess, deleteLessonSuccess, loadLessons, loadLessonsSuccess, updateLessonSuccess } from "./lesson.action";

export interface LessonState{
    lessons : Lesson[];
    isLoading : boolean;
    error : any
}

export const initialState : LessonState = {
    lessons : [],
    isLoading : false,
    error : null
}

export const lessonReducer = createReducer(
    initialState,

    on(loadLessons, state => ({
        ...state,
        isLoading : true,
        error : null
    })),

    on(loadLessonsSuccess, (state, { lessons }) => ({
        ...state,
        isLoading : false,
        lessons,
        error : null
    })),

    on(addLessonSuccess, (state, { lesson }) => ({
        ...state,
        lessons : [...state.lessons, lesson],
        error : null
    })),

    on(updateLessonSuccess, (state, { lesson }) => ({
        ...state, 
        lessons : state.lessons.map(l => l.id === lesson.id ? lesson : l),
        error : null
    })),

    on(deleteLessonSuccess, (state, { id }) => ({
        ...state,
        lessons : state.lessons.filter(l => l.id !== id),
        error : null
    }))
)
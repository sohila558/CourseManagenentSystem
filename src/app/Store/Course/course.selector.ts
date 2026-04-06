import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CourseState } from "./course.reducer";

export const selectCourseSelector = createFeatureSelector<CourseState>('courses');

export const selectAllCourses = createSelector(
    selectCourseSelector,
    (state) => state.courses
);

export const selectCourseById = (courseId: string) => createSelector(
    selectAllCourses,
    (courses) => courses.find(c => c.id === courseId)
);
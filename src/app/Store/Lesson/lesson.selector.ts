import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LessonState } from "./lesson.reducer";

export const selectLessonSelector = createFeatureSelector<LessonState>('lesson');

export const selectAllLesson = createSelector(
    selectLessonSelector,
    (state) => state.lessons
)

export const selectLessonsLoading = createSelector(
    selectLessonSelector,
    (state) => state.isLoading 
);
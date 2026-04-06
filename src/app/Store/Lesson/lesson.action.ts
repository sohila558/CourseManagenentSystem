import { createAction, props } from "@ngrx/store";
import { Lesson } from "../../Models/lesson";

export const loadLessons = createAction('[Lesson] Load Lessons', props<{courseId : string}>());
export const loadLessonsSuccess = createAction('[Lesson] Load Lessons Success', props<{lessons : Lesson[]}>());
export const loadLessonsFailure = createAction('[Lesson] Load Lessons Failure', props<{error : any}>());

export const addLesson = createAction('[Lesson] Add Lesson', props<{lesson : Lesson}>());
export const addLessonSuccess = createAction('[Lesson] Add Lesson Success', props<{lesson : Lesson}>());
export const addLessonFailure = createAction('[Lesson] Add Lesson Failure', props<{error : any}>());

export const updateLesson = createAction('[Lesson] Update Lesson', props<{lesson : Lesson}>());
export const updateLessonSuccess = createAction('[Lesson] Update Lesson Success', props<{lesson : Lesson}>());
export const updateLessonFailure = createAction('[Lesson] Update Lesson Failure', props<{error : any}>())

export const deleteLesson = createAction('[Lesson] Delete Lesson', props<{id : string}>());
export const deleteLessonSuccess = createAction('[Lesson] Delete Lesson Success', props<{id : string}>());
export const deleteLessonFailure = createAction('[Lesson] Delete Lesson Failure', props<{error : any}>());
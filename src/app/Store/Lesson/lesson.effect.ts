import { inject, Injectable } from "@angular/core";
import { LessonService } from "../../Services/Lesson/lesson.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addLesson, addLessonFailure, addLessonSuccess, deleteLesson, deleteLessonFailure, deleteLessonSuccess, loadLessons, loadLessonsFailure, loadLessonsSuccess, updateLesson, updateLessonFailure, updateLessonSuccess } from "./lesson.action";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";

@Injectable()
export class LessonEffect{
    _actions$ = inject(Actions);
    _lessonService = inject(LessonService);

    // The effect will pass the Id and put it in the URL
    // and when the component dispatch the action (loadLessons) it send it with id 
    // and the effect will take it and send it to the service with the Query Params
    // then the Json Server send only this course lessons
    loadLessons$ = createEffect(() => 
        this._actions$.pipe(
            ofType(loadLessons),
            switchMap(({ courseId }) => 
                this._lessonService.getAllLessons(courseId).pipe(
                    map((lessons) => loadLessonsSuccess({ lessons })),
                    catchError(error => of(loadLessonsFailure({ error })))
                )
            )
        )
    );

    addLesson$ = createEffect(() => 
        this._actions$.pipe(
            ofType(addLesson),
            mergeMap((action) => 
                this._lessonService.addLesson(action.lesson).pipe(
                    map((newLesson) => addLessonSuccess({ lesson : newLesson})),
                    catchError(error => of(addLessonFailure({ error })))
                )
            )
        )
    );

    updateLesson$ = createEffect(() => 
        this._actions$.pipe(
            ofType(updateLesson),
            mergeMap((action) =>
                this._lessonService.updateLesson(action.lesson).pipe(
                    map((updatedLesson) => updateLessonSuccess({ lesson : updatedLesson })),
                    catchError(error => of(updateLessonFailure({ error })))
                )
            )
        )
    );

    deleteLesson$ = createEffect(() => 
        this._actions$.pipe(
            ofType(deleteLesson),
            mergeMap((action) => 
                this._lessonService.deleteLesson(action.id).pipe(
                    map((id) => deleteLessonSuccess({ id : action.id })),
                    catchError(error => of(deleteLessonFailure({ error })))
                )
            )
        )
    );
}
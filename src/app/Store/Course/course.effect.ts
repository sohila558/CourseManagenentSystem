import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CourseService } from "../../Services/Course/course.service";
import { addCourse, addCourseFailure, addCourseSuccess, deleteCourse, deleteCourseFailure, deleteCourseSuccess, loadCourses, loadCoursesFailure, loadCoursesSuccess, updateCourse, updateCourseFailure, updateCourseSuccess } from "./course.action";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";

@Injectable()
export class CourseEffect{
    actions$ = inject(Actions);
    courseService = inject(CourseService);

    // switchMap => to ignore all the requests except the last one.
    // map => to call the Success Action 
    loadCourse$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadCourses),
            switchMap(() => 
                this.courseService.getAllCourses().pipe(
                    map((courses) => loadCoursesSuccess({ courses })),
                    catchError(error => of(loadCoursesFailure({ error })))
                )
            )
        )
    );

    // mergeMap => we used it in Add/Update/Delete so that if we perform multiple operations 
    // back-to-back it executes them all in order without canceling anything.
    addCourse$ = createEffect(() => 
        this.actions$.pipe(
            ofType(addCourse),
            mergeMap((action) => 
                this.courseService.addCourse(action.course).pipe(
                    map((newCourse) => addCourseSuccess({ course : newCourse })),
                    catchError(error => of(addCourseFailure({ error })))
                )
            )
        )
    );

    updateCourse$ = createEffect(() => 
        this.actions$.pipe(
            ofType(updateCourse),
            mergeMap((action) => 
                this.courseService.updateCourse(action.course).pipe(
                    map((updatedCourse) => updateCourseSuccess({ course : updatedCourse})),
                    catchError(error => of(updateCourseFailure({ error })))
                )
            )
        )
    );

    deleteCourse$ = createEffect(() => 
        this.actions$.pipe(
            ofType(deleteCourse),
            mergeMap((action) => 
                this.courseService.deleteCourse(action.id).pipe(
                    map(() => deleteCourseSuccess({ id : action.id })),
                    catchError(error => of(deleteCourseFailure({ error })))
                )
            )
        )
    );
}
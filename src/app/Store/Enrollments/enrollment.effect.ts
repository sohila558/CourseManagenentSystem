import { inject, Injectable } from "@angular/core";
import { EnrollmentService } from "../../Services/Enrollment/enrollment.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { cancelEnrollment, cancelEnrollmentFailure, cancelEnrollmentSuccess, enrollStudent, enrollStudentFailure, enrollStudentSuccess, loadEnrollments, loadEnrollmentsFailure, loadEnrollmentsSuccess } from "./enrollment.action";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";

@Injectable()
export class EnrollmentEffect {
    private actions$ = inject(Actions);
    private enrollmentService = inject(EnrollmentService);

    loadEnrollment$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadEnrollments),
            switchMap(() => 
                this.enrollmentService.getAllEnrollments().pipe(
                    map((enrollments) => loadEnrollmentsSuccess({ enrollments })),
                    catchError((error) => of(loadEnrollmentsFailure({ error })))
                )
            )
        )
    );

    enrollStudent$ = createEffect(() => 
        this.actions$.pipe(
            ofType(enrollStudent),
            mergeMap((action) => 
                this.enrollmentService.enrollStudent(action.enrollment).pipe(
                    map((enrollment) => enrollStudentSuccess({ enrollment })),
                    catchError((error) => of(enrollStudentFailure({ error })))
                )
            )
        )
    );

    cancelEnrollment$ = createEffect(() => 
        this.actions$.pipe(
            ofType(cancelEnrollment),
            mergeMap((action) => 
                this.enrollmentService.cancelEnrollment(action.enrollmentId).pipe(
                    map((enrollmentId) => cancelEnrollmentSuccess({ enrollmentId : action.enrollmentId })),
                    catchError((error) => of(cancelEnrollmentFailure({ error })))
                )
            )
        )
    );
}
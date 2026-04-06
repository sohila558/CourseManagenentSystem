import { createAction, props } from "@ngrx/store";
import { Enrollment } from "../../Models/enrollments";

export const loadEnrollments = createAction('[Enrollment] load Enrollments');
export const loadEnrollmentsSuccess = createAction('[Enrollment] load Enrollment Success', props<{ enrollments : Enrollment[] }>());
export const loadEnrollmentsFailure = createAction('[Enrollment] load Enrollment Failure', props<{ error : any }>());

export const enrollStudent = createAction('[Enrollment] Enroll Student', props<{ enrollment : Enrollment }>());
export const enrollStudentSuccess = createAction('[Enrollment] Enroll Student Success', props<{ enrollment : Enrollment }>());
export const enrollStudentFailure = createAction('[Enrollment] Enroll Student Failure', props<{ error : any }>());

export const cancelEnrollment = createAction('[Enrollment] Cancel Enrollment', props<{ enrollmentId : string }>());
export const cancelEnrollmentSuccess = createAction('[Enrollment] Cancel Enrollment Success', props<{ enrollmentId : string }>());
export const cancelEnrollmentFailure = createAction('[Enrollment] Cancel Enrollment Failure', props<{ error : any }>());
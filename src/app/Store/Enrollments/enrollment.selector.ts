import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EnrollmentState } from "./enrollment.reducer";

export const selectEnrollmentState = createFeatureSelector<EnrollmentState>('enrollments');

export const selectAllEnrollments = createSelector(
  selectEnrollmentState,
  (state) => state.enrollments
);

export const selectEnrollmentLoading = createSelector(
  selectEnrollmentState,
  (state) => state.isLoading
);

// to get the students who enrolled with this instructor courses
export const selectInstructorStudents = (instructorName: string) => createSelector(
  selectAllEnrollments,
  (enrollments) => enrollments.filter(e => e.instructorName === instructorName)
);

export const selectInstructorStudentsCount = (instructorName: string) => createSelector(
  selectInstructorStudents(instructorName),
  (myStudents) => myStudents.length
);

// to get the courses which the student is enroled to

export const selectStudentEnrollments = (studentId: string) => createSelector(
  selectAllEnrollments,
  (enrollments) => enrollments.filter(e => e.studentId === studentId)
);

export const selectEnrolledCourseIds = (studentId: string) => createSelector(
  selectStudentEnrollments(studentId),
  (myEnrollments) => myEnrollments.map(e => e.courseId)
);

export const isStudentEnrolledInCourse = (studentId: string, courseId: string) => createSelector(
  selectEnrolledCourseIds(studentId),
  (enrolledIds) => enrolledIds.includes(courseId)
);

export const selectStudentCourseNames = (studentId: string) => createSelector(
  selectStudentEnrollments(studentId),
  (myEnrollments) => myEnrollments.map(e => e.courseTitle).join(', ')
);
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, startWith } from 'rxjs';
import { selectAllCourses } from '../../../Store/Course/course.selector';
import { selectCurrentUser } from '../../../Store/Auth/auth.selector';
import { selectAllEnrollments } from '../../../Store/Enrollments/enrollment.selector';
import { loadCourses } from '../../../Store/Course/course.action';
import { loadEnrollments } from '../../../Store/Enrollments/enrollment.action';
import { AsyncPipe, CommonModule } from '@angular/common';
import { loginSuccess } from '../../../Store/Auth/auth.action';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-instructor-dashboard',
  imports: [CommonModule, AsyncPipe, LayoutComponent],
  templateUrl: './instructor-dashboard.component.html',
  styleUrl: './instructor-dashboard.component.css'
})
export class InstructorDashboardComponent implements OnInit {

  private _store = inject(Store);

  // bringing the instructor's data and all the data associated with him in one Observable 
  dashboardData$ = combineLatest([
    this._store.select(selectAllCourses).pipe(startWith([])),
    this._store.select(selectCurrentUser),
    this._store.select(selectAllEnrollments).pipe(startWith([]))
  ]).pipe(
    map(([courses, user, enrollments]) => {

      console.log('Mapping Data -> Students found:', enrollments.length);

      // Filtering the courses that this instructor provides
      const myCourses = courses.filter(c => c.instructorName === user?.name);

      // Filtering students registered in this instructor's courses 
      const myStudents = enrollments.filter(e => e.instructorName.trim() === user?.name.trim());

      return {
        user,
        courses: myCourses,
        students: myStudents,
        totalCourses: myCourses.length,
        totalStudents: myStudents.length
      }
    })
  );

  ngOnInit(): void {
    this._store.dispatch(loadCourses());
    this._store.dispatch(loadEnrollments());

    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this._store.dispatch(loginSuccess({ user }));
    }
  }

}

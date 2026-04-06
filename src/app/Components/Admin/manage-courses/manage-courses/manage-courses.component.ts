import { Component, inject, OnInit } from '@angular/core';
import { CourseListTableComponent } from "../course-list-table/course-list-table.component";
import { AddCourseModalComponent } from "../add-course-modal/add-course-modal.component";
import { AsyncPipe, CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectAllCourses } from '../../../../Store/Course/course.selector';
import { addCourse, deleteCourse, loadCourses } from '../../../../Store/Course/course.action';
import { Course } from '../../../../Models/course';

@Component({
  selector: 'app-manage-courses',
  imports: [CourseListTableComponent, AddCourseModalComponent, AsyncPipe, CommonModule],
  templateUrl: './manage-courses.component.html',
  styleUrl: './manage-courses.component.css'
})
export class ManageCoursesComponent implements OnInit {

  private _store = inject(Store);
  private _router = inject(Router);

  courses$ = this._store.select(selectAllCourses);

  ngOnInit(): void {
    this._store.dispatch(loadCourses());

    this.courses$.subscribe(data => {
      console.log('Courses from Store:', data);
    });
  }

  viewLessons(courseId: string) {
    this._router.navigate(['/admin/courses', courseId, 'lessons']);
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this course?')) {
      this._store.dispatch(deleteCourse({ id }));
    }
  }

  onCourseAdded(newCourse: Course) {
    this._store.dispatch(addCourse({ course: newCourse }));
  }

}

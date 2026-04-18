import { Component, inject, OnInit } from '@angular/core';
import { CourseListTableComponent } from "../course-list-table/course-list-table.component";
import { AddCourseModalComponent } from "../add-course-modal/add-course-modal.component";
import { AsyncPipe, CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectAllCourses } from '../../../../Store/Course/course.selector';
import { addCourse, deleteCourse, loadCourses, updateCourse } from '../../../../Store/Course/course.action';
import { Course } from '../../../../Models/course';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-courses',
  imports: [CourseListTableComponent, AddCourseModalComponent, AsyncPipe, CommonModule],
  templateUrl: './manage-courses.component.html',
  styleUrl: './manage-courses.component.css'
})
export class ManageCoursesComponent implements OnInit {

  private _store = inject(Store);
  private _router = inject(Router);
  private _toastr = inject(ToastrService);

  courses$ = this._store.select(selectAllCourses);
  selectedCourse : Course | null = null;

  ngOnInit(): void {
    this._store.dispatch(loadCourses());

    this.courses$.subscribe(data => {
      console.log('Courses from Store:', data);
    });
  }

  viewLessons(courseId: string) {
    this._router.navigate(['/admin/courses', courseId, 'lessons']);
  }

  handleEdit(course : Course) {
    this.selectedCourse = course;
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this course?')) {
      this._store.dispatch(deleteCourse({ id }));
      this._toastr.error('Course deleted successfully!', 'Deleted')
    }
  }

}

import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { selectAllCourses } from '../../../Store/Course/course.selector';
import { selectCurrentUser } from '../../../Store/Auth/auth.selector';
import { addCourse, deleteCourse, loadCourses, updateCourse } from '../../../Store/Course/course.action';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-courses',
  imports: [RouterLink, AsyncPipe, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './manage-courses.component.html',
  styleUrl: './manage-courses.component.css'
})
export class ManageCoursesComponent implements OnInit {

  private _store = inject(Store);
  private _fb = inject(FormBuilder);
  private _searchSubject = new BehaviorSubject<string>('');

  courseForm!: FormGroup;
  searchText: string = '';
  editingCourseId: string | null = null;

  myCourses$ = combineLatest([
    this._store.select(selectAllCourses),
    this._store.select(selectCurrentUser),
    this._searchSubject.asObservable()
  ]).pipe(
    map(([courses, user, search]) => {
      const instructorCourses = courses.filter(c => c.instructorName === user?.name);

      return instructorCourses.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.category?.toLowerCase().includes(search.toLowerCase())
      );
    })
  );

  ngOnInit(): void {
    this._store.dispatch(loadCourses());
    this.courseForm = this._fb.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      instructorName: ['Mahmoud Rayan']
    });
  }

  onCreateCourse() {
    if (this.courseForm.valid) {
      const courseData = { ...this.courseForm.value };

      if (this.editingCourseId) {
        this._store.dispatch(updateCourse({ course: { ...courseData, id: this.editingCourseId } }));
      } else {
        const newCourse = { ...courseData, id: 'c' + Math.floor(Math.random() * 1000) };
        this._store.dispatch(addCourse({ course: newCourse }));
      }

      this.courseForm.reset({ instructorName: 'Mahmoud Rayan' });
      this.editingCourseId = null;
    }
  }

  onSearch() {
    this._searchSubject.next(this.searchText);
  }

  editCourse(course: any) {
    this.editingCourseId = course.id;
    this.courseForm.patchValue(course);
  }

  onDeleteCourse(id: string) {
    if (confirm('Are you sure you want to delete this course?')) {
      this._store.dispatch(deleteCourse({ id }));
    }
  }
}

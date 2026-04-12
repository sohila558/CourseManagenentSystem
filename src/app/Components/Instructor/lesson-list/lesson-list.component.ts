import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addLesson, deleteLesson, loadLessons } from '../../../Store/Lesson/lesson.action';
import { selectAllLesson, selectLessonsLoading } from '../../../Store/Lesson/lesson.selector';
import { map } from 'rxjs';
import { selectCourseById } from '../../../Store/Course/course.selector';
import { loadCourses } from '../../../Store/Course/course.action';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lesson-list',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './lesson-list.component.html',
  styleUrl: './lesson-list.component.css'
})
export class LessonListComponent implements OnInit {

  private _route = inject(ActivatedRoute);
  private _store = inject(Store);
  private _fb = inject(FormBuilder);
  private _toastr = inject(ToastrService);

  courseId = this._route.snapshot.paramMap.get('id');

  lessons$ = this._store.select(selectAllLesson).pipe(
    map(lessons => lessons.filter(l => l.courseId === this.courseId)
                          .sort((a, b) => (a.order || 0) - (b.order || 0)))
  );
  
  course$ = this._store.select(selectCourseById(this.courseId!));
  isLoading$ = this._store.select(selectLessonsLoading);
  
  lessonForm!: FormGroup;

  ngOnInit(): void {
    this._store.dispatch(loadCourses());
    this.initForm();
    if (this.courseId) {
      this._store.dispatch(loadLessons({ courseId: this.courseId }));
    }
  }

  initForm() {
    this.lessonForm = this._fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      videoUrl: ['', [Validators.required]],
      courseId: [this.courseId],
      order: [0] 
    });
  }

  onSubmit() {
    if (this.lessonForm.valid) {
      const newLesson = { ...this.lessonForm.value };
      this._store.dispatch(addLesson({ lesson: newLesson }));
      this._toastr.success('Lesson added successfully!', 'Success');
      
      this.lessonForm.reset({ courseId: this.courseId });
    }
  }

  deleteLesson(id: string) {
    if (confirm('Are you sure you want to delete this lesson?')) {
      this._store.dispatch(deleteLesson({ id }));
      this._toastr.error('Lesson deleted successfully!', 'Deleted');
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Course } from '../../../../Models/course';
import { Store } from '@ngrx/store';
import { selectAllUsers } from '../../../../Store/Users/Users.selector';
import { map } from 'rxjs';
import { loadUsers } from '../../../../Store/Users/Users.action';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-course-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-course-modal.component.html',
  styleUrl: './add-course-modal.component.css'
})
export class AddCourseModalComponent implements OnInit, OnChanges {

  private _fb = inject(FormBuilder);
  private _store = inject(Store);
  private _toastr = inject(ToastrService);

  instructors$ = this._store.select(selectAllUsers).pipe(
    map(users => users.filter(user => user.role === 'Instructor'))
  );

  @Output() courseAdded = new EventEmitter<Course>();
  @Input() courseToEdit: Course | null = null;
  @Output() courseUpdated = new EventEmitter<Course>();

  courseForm: FormGroup = this._fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    instructorName: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(10)]]
  });

  ngOnChanges(): void {
    if (this.courseToEdit) {
      this.courseForm.patchValue(this.courseToEdit);
    } else {
      this.courseForm.reset();
    }
  }

  ngOnInit(): void {
    this._store.dispatch(loadUsers());
  }

  onSubmit() {
    if (this.courseForm.valid) {

      if (this.courseToEdit) {
        const updatedCourse: Course = {
          ...this.courseToEdit,
          ...this.courseForm.value
        };

        this.courseUpdated.emit(updatedCourse);
        this._toastr.info('Course Updated Successfully!', 'Updated');
      } else {
        const newCourse: Course = {
          ...this.courseForm.value,
          id: 'c' + Math.floor(Math.random() * 1000),
          lessons: []
        };

        this.courseAdded.emit(newCourse);
        this._toastr.success('Course Added Successfuly!', 'Success')
      }

      this.courseForm.reset();

      const modalElement = document.getElementById('addCourseModal');
      if (modalElement) {
        const modalInstance = (window as any).bootstrap.Modal.getInstance(modalElement);
        modalInstance?.hide();
      }
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Course } from '../../../../Models/course';
import { Store } from '@ngrx/store';
import { selectAllUsers } from '../../../../Store/Users/Users.selector';
import { map } from 'rxjs';
import { loadUsers } from '../../../../Store/Users/Users.action';

@Component({
  selector: 'app-add-course-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-course-modal.component.html',
  styleUrl: './add-course-modal.component.css'
})
export class AddCourseModalComponent implements OnInit{
  
  private _fb = inject(FormBuilder);
  private _store = inject(Store);
  
  instructors$ = this._store.select(selectAllUsers).pipe(
    map(users => users.filter(user => user.role === 'Instructor'))
  );
  
  @Output() courseAdded = new EventEmitter<Course>();
  
  courseForm : FormGroup = this._fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    instructorName: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(10)]]
  });
  
  ngOnInit(): void {
    this._store.dispatch(loadUsers());
  }

  onSubmit() {
    if(this.courseForm.valid) {
      const newCourse : Course = {
        ...this.courseForm.value,
        id: 'c' + Math.floor(Math.random() * 1000),
        lessons : []
      };

      this.courseAdded.emit(newCourse);
      this.courseForm.reset();

      const modalElement = document.getElementById('addCourseModal');
      if (modalElement) {
        const modalInstance = (window as any).bootstrap.Modal.getInstance(modalElement);
        modalInstance?.hide();
      }
    }
  }
}

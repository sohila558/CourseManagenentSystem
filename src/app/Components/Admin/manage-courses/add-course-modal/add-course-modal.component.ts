import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Course } from '../../../../Models/course';
import { Store } from '@ngrx/store';
import { selectAllUsers } from '../../../../Store/Users/Users.selector';
import { map } from 'rxjs';
import { loadUsers } from '../../../../Store/Users/Users.action';
import { ToastrService } from 'ngx-toastr';
import { addCourse, updateCourse } from '../../../../Store/Course/course.action';

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
  private _cdr = inject(ChangeDetectorRef);

  imagePreview: string | null = null;
  selectedFileName: string = '';

  instructors$ = this._store.select(selectAllUsers).pipe(
    map(users => users.filter(user => user.role === 'Instructor'))
  );

  @Input() courseToEdit: Course | null = null;
  @Input() courseId!: string;
  @Output() courseAdded = new EventEmitter<Course>();
  @Output() courseUpdated = new EventEmitter<Course>();

  courseForm: FormGroup = this._fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    instructorName: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    image: ['']
  });

  ngOnChanges(): void {
    if (this.courseToEdit) {
      this.courseForm.patchValue(this.courseToEdit);
      this.imagePreview = this.courseToEdit.image || null;
    } else {
      this.courseForm.reset();
      this.imagePreview = null;
      this.selectedFileName = '';
    }
  }

  ngOnInit(): void {
    this._store.dispatch(loadUsers());
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.courseForm.patchValue({ image: this.imagePreview });
        this._cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.imagePreview = null;
    this.selectedFileName = '';
    this.courseForm.patchValue({ image: '' });
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const formValues = this.courseForm.value;

      if (this.courseToEdit) {

        const updatedCourse: Course = {
          ...this.courseToEdit,
          ...formValues,
          image: this.imagePreview || this.courseToEdit.image
        };

        this._store.dispatch(updateCourse({ course: updatedCourse }));
        this._toastr.info('Course Updated Successfully!', 'Updated');

      } else {

        const newCourse: Course = {
          ...formValues,
          id: 'c' + Math.floor(Math.random() * 1000),
          image: this.imagePreview,
          lessons: []
        };

        this._store.dispatch(addCourse({ course: newCourse }));
        this._toastr.success('Course Added Successfully!', 'Success');
      }

      this.closeModal();
    }
  }

  closeModal() {
    this.courseForm.reset();
    this.imagePreview = null;
    this.selectedFileName = '';
    const modalElement = document.getElementById('addCourseModal');
    if (modalElement) {
      const modalInstance = (window as any).bootstrap.Modal.getInstance(modalElement);
      modalInstance?.hide();
    }
  }
}
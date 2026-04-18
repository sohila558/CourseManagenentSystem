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
  selectedFile: File | null = null; 

  instructors$ = this._store.select(selectAllUsers).pipe(
    map(users => users.filter(user => user.role === 'Instructor'))
  );

  @Input() courseToEdit: Course | null = null;
  @Input() courseId!: string;
  @Output() courseAdded = new EventEmitter<Course>();
  @Output() courseUpdated = new EventEmitter<Course>();

  courseForm: FormGroup = this._fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    instructorName: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]],
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
      this.selectedFile = file;
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
    this.selectedFile = null;
    this.courseForm.patchValue({ image: '' });
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const fd = new FormData();

      fd.append('title', this.courseForm.get('title')?.value);
      fd.append('instructorName', this.courseForm.get('instructorName')?.value);
      fd.append('description', this.courseForm.get('description')?.value);

      if(this.selectedFile){
        fd.append('image', this.selectedFile);
      }

      if (this.courseToEdit) {

        fd.append('id', this.courseToEdit.id.toString());

        this._store.dispatch(updateCourse({ course: fd }));
        this._toastr.info('Course Updated Successfully!', 'Updated');

      } else {

        this._store.dispatch(addCourse({ course: fd }));
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
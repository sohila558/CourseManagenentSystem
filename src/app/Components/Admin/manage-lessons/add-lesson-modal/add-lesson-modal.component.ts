import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Lesson } from '../../../../Models/lesson';
import { addLesson, updateLesson } from '../../../../Store/Lesson/lesson.action';

@Component({
  selector: 'app-add-lesson-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-lesson-modal.component.html',
  styleUrl: './add-lesson-modal.component.css'
})
export class AddLessonModalComponent implements OnInit, OnChanges {

  private _fb = inject(FormBuilder);
  private _store = inject(Store);

  @Input() lessonToEdit: Lesson | null = null;
  @Input() courseId! : string;

  lessonForm!: FormGroup;

  ngOnInit(): void {
    this.lessonForm = this._fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      content: ['', [Validators.required]],
      videoUrl: [''],
      order: [1, [Validators.required, Validators.min(1)]],
      isCompleted: [false]
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.lessonToEdit){
      this.lessonForm.patchValue(this.lessonToEdit);
    } else {
      this.lessonForm?.reset({ order : 1, isCompleted : false});
    }
  }

  onSubmit(){
    if(this.lessonForm.valid) {
      const lessonData : Lesson = {
        ...this.lessonForm.value,
        id: this.lessonToEdit ? this.lessonToEdit.id : Math.random().toString(36).substr(2, 9),
        courseId: this.courseId
      };

      if(this.lessonToEdit) {
        this._store.dispatch(updateLesson({ lesson : lessonData }));
      } else {
        this._store.dispatch(addLesson({ lesson : lessonData }))
      }

      this.lessonForm.reset();
    }
  }

}

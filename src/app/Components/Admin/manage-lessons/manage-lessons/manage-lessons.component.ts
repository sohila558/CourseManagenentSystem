import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAllLesson } from '../../../../Store/Lesson/lesson.selector';
import { Lesson } from '../../../../Models/lesson';
import { deleteLesson, loadLessons } from '../../../../Store/Lesson/lesson.action';
import { AddLessonModalComponent } from "../add-lesson-modal/add-lesson-modal.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-lessons',
  imports: [CommonModule, RouterLink, AddLessonModalComponent, AsyncPipe],
  templateUrl: './manage-lessons.component.html',
  styleUrl: './manage-lessons.component.css'
})
export class ManageLessonsComponent implements OnInit{

  private _route = inject(ActivatedRoute);
  private _store = inject(Store);
  private _toastr = inject(ToastrService);
  
  courseId! : string;
  lessons$ = this._store.select(selectAllLesson);
  selectedLesson : Lesson | null = null;
  
  ngOnInit(): void {
    // get the id of the course from the URL if exist.
    this.courseId = this._route.snapshot.paramMap.get('courseId')!;

    // if we found the id we send it with loadLessons Action to the Effect to get the data from the store.
    if(this.courseId){
      this._store.dispatch(loadLessons({ courseId : this.courseId }));
    }
  }

  handleDelete(id : string){
    if(confirm('Are You sure you want to delete this Lesson?')){
      this._store.dispatch(deleteLesson({ id }));
      this._toastr.error('Lesson deleted successfully!', 'Deleted');
    }
  }

  handleEdit(lesson : Lesson){
    this.selectedLesson = lesson;
  }

  clearSelected(){
    this.selectedLesson = null;
  }

}

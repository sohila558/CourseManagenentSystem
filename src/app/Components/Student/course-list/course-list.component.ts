import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAllCourses } from '../../../Store/Course/course.selector';
import { loadCourses } from '../../../Store/Course/course.action';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Course } from '../../../Models/course';
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, NavBarComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {

  private _store = inject(Store);

  courses$ = this._store.select(selectAllCourses);
  filteredCourses$!: Observable<Course[]>;
  searchText: string = '';
  private searchSubject = new BehaviorSubject<string>('');

  ngOnInit(): void {
    this._store.dispatch(loadCourses());
    this.filteredCourses$ = combineLatest([this.courses$, this.searchSubject]).pipe(
      map(([courses, text]) =>
        courses.filter(c => c.title.toLowerCase().includes(text.toLowerCase()))
      )
    );
  }

  onSearchChange() {
    this.searchSubject.next(this.searchText);
  }

}

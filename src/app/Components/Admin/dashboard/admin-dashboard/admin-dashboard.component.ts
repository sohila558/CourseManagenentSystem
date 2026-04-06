import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { Statistics } from '../../../../Models/statistics';
import { AdminService } from '../../../../Services/Admin/admin.service';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { selectAllInstructor, selectAllStudents } from '../../../../Store/Users/Users.selector';
import { loadUsers } from '../../../../Store/Users/Users.action';
import { selectAllCourses } from '../../../../Store/Course/course.selector';
import { loadCourses } from '../../../../Store/Course/course.action';
import { LayoutComponent } from "../../layout/layout.component";

@Component({
  selector: 'app-admin-dashboard',
  imports: [AsyncPipe, RouterLink, LayoutComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  private _adminService = inject(AdminService);
  private _store = inject(Store);
  totalStudents$ = this._store.select(selectAllStudents);
  totalInstructors$ = this._store.select(selectAllInstructor);
  totalCourses$ = this._store.select(selectAllCourses).pipe(map(c => c.length));
  stats$: Observable<Statistics | undefined> | undefined;


  ngOnInit(): void {
    this.loadDashboardStats();
    this._store.dispatch(loadUsers());
    this._store.dispatch(loadCourses());
  }

  loadDashboardStats(): void {
    this.stats$ = this._adminService.getDashboardState();
  }

}

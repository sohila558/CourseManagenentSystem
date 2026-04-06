import { Component, inject, OnInit } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../Services/Auth/auth.service';
import { map, Observable } from 'rxjs';
import { loadEnrollments } from '../../../Store/Enrollments/enrollment.action';
import { selectAllEnrollments } from '../../../Store/Enrollments/enrollment.selector';

@Component({
  selector: 'app-my-courses',
  imports: [NavBarComponent, CommonModule, RouterLink],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent implements OnInit{
  
  private _store = inject(Store);
  private _authService = inject(AuthService);

  myEnrollments$!: Observable<any[]>;

  ngOnInit(): void {
    const user = this._authService.getUserFromStorage();
    
    if (user) {
      this._store.dispatch(loadEnrollments());

      this.myEnrollments$ = this._store.select(selectAllEnrollments).pipe(
        map(enrollments => enrollments.filter(e => e.studentId === user.id))
      );
    }
  }

}

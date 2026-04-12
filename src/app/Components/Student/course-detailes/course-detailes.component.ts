import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAllCourses } from '../../../Store/Course/course.selector';
import { map, Observable, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../Services/Auth/auth.service';
import { loadCourses } from '../../../Store/Course/course.action';
import { Enrollment } from '../../../Models/enrollments';
import { cancelEnrollment, enrollStudent } from '../../../Store/Enrollments/enrollment.action';
import { selectAllEnrollments } from '../../../Store/Enrollments/enrollment.selector';
import { selectAllWishlist } from '../../../Store/Wishlist/wishlist.selector';
import { addToWishlist, removeFromWishlist } from '../../../Store/Wishlist/wishlist.action';
import { WishlistItem } from '../../../Models/wishlist';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-detailes',
  imports: [CommonModule, RouterLink, NavBarComponent],
  templateUrl: './course-detailes.component.html',
  styleUrl: './course-detailes.component.css'
})
export class CourseDetailesComponent implements OnInit {

  private _route = inject(ActivatedRoute);
  private _store = inject(Store);
  private _authService = inject(AuthService);
  private _toastr = inject(ToastrService);

  courseId: string | null = null;
  course$!: Observable<any>;
  isEnrolled$!: Observable<boolean>;
  isInWishlist$!: Observable<boolean>;

  ngOnInit(): void {
    this.courseId = this._route.snapshot.paramMap.get('id');

    if (this.courseId) {
      this.course$ = this._store.select(selectAllCourses).pipe(
        map(courses => {
          if (courses.length === 0) {
            this._store.dispatch(loadCourses());
          }
          return courses.find(c => c.id === this.courseId);
        })
      );

      this.isEnrolled$ = this._store.select(selectAllEnrollments).pipe(
        map(enrollments => enrollments.some(e => e.courseId === this.courseId))
      );

      this.isInWishlist$ = this._store.select(selectAllWishlist).pipe(
        map(items => items.some(item => item.courseId === this.courseId))
      );
    }
  }

  enroll() {
    const user = this._authService.getUserFromStorage();
    if (!user) {
      this._toastr.warning('Please login first to enroll!')
      return;
    }

    this.course$.pipe(take(1)).subscribe(course => {
      if (course) {
        const newEnrollment: Enrollment = {
          id: Math.random().toString(36).substring(2, 11),
          courseId: course.id,
          courseTitle: course.title,
          courseImage: course.image,
          enrollDate: new Date().toISOString(),
          status: 'Active',
          studentId: user.id,
          studentName: user.name,
          instructorName: course.instructorName
        };

        this._store.dispatch(enrollStudent({ enrollment: newEnrollment }));
        this._toastr.success(`Successfully enrolled in ${course.title}!`, 'Success');
      }
    });
  }

  cancelEnrollment() {
    if (confirm('Are you sure you want to cancel your enrollment?')) {
      this._store.select(selectAllEnrollments).pipe(take(1)).subscribe(enrollments => {
        const currentEnrollment = enrollments.find(e => e.courseId === this.courseId);

        if (currentEnrollment) {
          this._store.dispatch(cancelEnrollment({ enrollmentId: currentEnrollment.id }));
          this._toastr.error('Enrollment canceled!')
        } else {
          this._toastr.error('Something went wrong!');
          console.error("Enrollment ID not found");
        }
      });
    }
  }

  toggleWishlist() {
    const user = this._authService.getUserFromStorage();
    if (!user) {
      this._toastr.warning('Please login first!');
      return;
    }

    this.isInWishlist$.pipe(take(1)).subscribe(exists => {
      if (exists) {
        this._store.select(selectAllWishlist).pipe(take(1)).subscribe(items => {
          const item = items.find(i => i.courseId === this.courseId);
          if (item) {
            this._store.dispatch(removeFromWishlist({ itemId: item.id }));
            this._toastr.error('Course removed From Wishlist!', 'Canceled')
          }
        });
      } else {
        this.course$.pipe(take(1)).subscribe(course => {
          if (course) {
            const wishItem: WishlistItem = {
              id: Math.random().toString(36).substring(2, 11),
              courseId: course.id,
              courseTitle: course.title,
              courseImage: course.image,
              addedDate: new Date().toISOString(),
              userId: user.id
            };
            this._store.dispatch(addToWishlist({ item: wishItem }));
            this._toastr.success('Course added to wishlist successfully!', 'Success');
          }
        });
      }
    });
  }

}

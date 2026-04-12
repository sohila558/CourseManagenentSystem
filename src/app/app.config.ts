import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { authReducer } from './Store/Auth/auth.reducer';
import { AuthEffect } from './Store/Auth/auth.effects';
import { userReducer } from './Store/Users/Users.reducer';
import { UserEffects } from './Store/Users/Users.effect';
import { courseReducer } from './Store/Course/course.reducer';
import { CourseEffect } from './Store/Course/course.effect';
import { lessonReducer } from './Store/Lesson/lesson.reducer';
import { LessonEffect } from './Store/Lesson/lesson.effect';
import { enrollReducer } from './Store/Enrollments/enrollment.reducer';
import { EnrollmentEffect } from './Store/Enrollments/enrollment.effect';
import { WishlistEffects } from './Store/Wishlist/wishlist.effect';
import { wishlistReducer } from './Store/Wishlist/wishlist.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes, 
      withComponentInputBinding(), 
      withViewTransitions()
    ),
    provideHttpClient(),
    provideStore({
      auth : authReducer,
      user : userReducer,
      courses : courseReducer,
      lesson : lessonReducer,
      enrollments : enrollReducer,
      wishlist : wishlistReducer
    }),
    provideEffects([AuthEffect, UserEffects, CourseEffect, LessonEffect, EnrollmentEffect, WishlistEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ]
};

import { Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';
import { RoleGuard } from './Guards/role.guard';
import { LayoutComponent } from './Components/Instructor/layout/layout.component';
import { LessonListComponent } from './Components/Instructor/lesson-list/lesson-list.component';
import { LoginGuard } from './Guards/login.guard';

// Lazy Loading => to loading just the needed component 
// 1. Prevent the application from loading everything at once
// 2. Petter User Experience 
// 3. Make sure that student will not go to admin pages by wrong or vice versa
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        canActivate: [LoginGuard],
        loadComponent: () => import('./Components/Auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'unauthorized',
        loadComponent: () => import('./Components/Shared/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
    },
    {
        // After login if we found in the URL "Admin" we go to it's folder 
        path: 'admin',
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'Admin' },
        loadChildren: () => import('./Services/Admin/admin.routes').then(m => m.ADMIN_ROUTES)
    },
    {
        // the same if we found student 
        path: 'student',
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'Student' },
        loadChildren: () => import('./Services/Student/student.routes').then(m => m.STUDENT_ROUTES)
    },
    {
        path: 'instructor',
        component: LayoutComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'Instructor' },
        children: [
            {
                path: '',
                loadComponent: () => import('./Components/Instructor/instructor-dashboard/instructor-dashboard.component').then(m => m.InstructorDashboardComponent)
            },
            {
                path: 'my-courses',
                loadComponent: () => import('./Components/Instructor/manage-courses/manage-courses.component').then(m => m.ManageCoursesComponent)
            },
            {
                path: 'manage-lessons/:id',
                component: LessonListComponent
            }
        ]
    }
];

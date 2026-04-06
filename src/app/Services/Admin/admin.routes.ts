import { Routes } from "@angular/router";
import { AdminDashboardComponent } from "../../Components/Admin/dashboard/admin-dashboard/admin-dashboard.component";
import { ManageCoursesComponent } from "../../Components/Admin/manage-courses/manage-courses/manage-courses.component";
import { ManageUsersComponent } from "../../Components/Admin/manage-users/manage-users/manage-users.component";
import { LayoutComponent } from "../../Components/Admin/layout/layout.component";
import { ManageLessonsComponent } from "../../Components/Admin/manage-lessons/manage-lessons/manage-lessons.component";

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                component: AdminDashboardComponent
            },
            {
                path: 'manage-courses',
                component: ManageCoursesComponent
            },
            {
                path: 'manage-users',
                component: ManageUsersComponent
            },
            {
                path: 'courses/:courseId/lessons',
                component: ManageLessonsComponent
            },
            { 
                path: '', 
                redirectTo: 'dashboard', 
                pathMatch: 'full' 
            }
        ]
    }
]
import { Routes } from "@angular/router";
import { CourseListComponent } from "../../Components/Student/course-list/course-list.component";
import { CourseDetailesComponent } from "../../Components/Student/course-detailes/course-detailes.component";
import { MyCoursesComponent } from "../../Components/Student/my-courses/my-courses.component";
import { MyWishlistComponent } from "../../Components/Student/my-wishlist/my-wishlist.component";

export const STUDENT_ROUTES : Routes = [
    {
        path:'',
        component: CourseListComponent
    },
    {
        path: 'course/:id',
        component: CourseDetailesComponent
    },
    {
        path: 'my-courses',
        component: MyCoursesComponent
    },
    {
        path: 'wishlist',
        component: MyWishlistComponent
    }
]
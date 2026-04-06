import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../Models/course';
import { environment } from '../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private _httpClient = inject(HttpClient);

  getAllCourses() : Observable<Course[]>{
    return this._httpClient.get<Course[]>(`${environment.baseUrl}/courses`);
  }

  getCourseById(id : string) : Observable<Course>{
    return this._httpClient.get<Course>(`${environment.baseUrl}/courses/${id}`)
  }

  addCourse(course : Course) : Observable<Course>{
    return this._httpClient.post<Course>(`${environment.baseUrl}/courses`, course);
  }

  updateCourse(updatedCourse : Course) : Observable<Course>{
    return this._httpClient.put<Course>(`${environment.baseUrl}/courses/${updatedCourse.id}`, updatedCourse);
  }

  deleteCourse(id : string) : Observable<void>{
    return this._httpClient.delete<void>(`${environment.baseUrl}/courses/${id}`)
  }
}

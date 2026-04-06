import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Environment/environment';
import { Lesson } from '../../Models/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private _httpClient = inject(HttpClient);

  getAllLessons(courseId : string) : Observable<Lesson[]>{
    return this._httpClient.get<Lesson[]>(`${environment.baseUrl}/lessons/?courseId=${courseId}`);
  }

  getLessonById(id : string) : Observable<Lesson>{
    return this._httpClient.get<Lesson>(`${environment.baseUrl}/lessons/${id}`)
  }

  addLesson(newLesson : Lesson) : Observable<Lesson>{
    return this._httpClient.post<Lesson>(`${environment.baseUrl}/lessons`, newLesson);
  }

  updateLesson(updatedLesson : Lesson) : Observable<Lesson>{
    return this._httpClient.put<Lesson>(`${environment.baseUrl}/lessons/${updatedLesson.id}`, updatedLesson);
  }

  deleteLesson(id : string) : Observable<void>{
    return this._httpClient.delete<void>(`${environment.baseUrl}/lessons/${id}`)
  }
}

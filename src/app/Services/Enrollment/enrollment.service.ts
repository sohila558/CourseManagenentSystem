import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment } from '../../Models/enrollments';
import { environment } from '../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private _httpClient = inject(HttpClient);

  getAllEnrollments() : Observable<Enrollment[]> {
    return this._httpClient.get<Enrollment[]>(`${environment.baseUrl}/enrollments`);
  }

  getStudentEnrollments(studentId : string) : Observable<Enrollment[]> {
    return this._httpClient.get<Enrollment[]>(`${environment.baseUrl}/enrollments?studentId=${studentId}`);
  }

  enrollStudent(enrollment : Enrollment) : Observable<Enrollment> {
    return this._httpClient.post<Enrollment>(`${environment.baseUrl}/enrollments`, enrollment);
  }

  cancelEnrollment(id : string) : Observable<void> {
    return this._httpClient.delete<void>(`${environment.baseUrl}/enrollments/${id}`);
  }

}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, switchMap, throwError } from 'rxjs';
import { User } from '../../Models/user';
import { environment } from '../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient = inject(HttpClient);

  login(email: string, password: string): Observable<User> {
    return this.httpClient.get<User[]>(`${environment.baseUrl}/users?email=${email}&password=${password}`)
      .pipe(
        // switchMap => return Observable
        // map => return Value
        switchMap(users => {
          if (users.length > 0) {
            return of(users[0]);
          } else {
            // throwError => return Observable 
            // So we have to use switchMap with throwError (both of them return Observable)
            return throwError(() => new Error('Email or Password incorrect'));
          }
        })
      );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

  getUserFromStorage(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

}

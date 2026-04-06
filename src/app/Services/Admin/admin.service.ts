import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "../../Models/user";
import { environment } from "../../Environment/environment";
import { Observable } from "rxjs";
import { Statistics } from "../../Models/statistics";

@Injectable({
    providedIn : 'root'
})
export class AdminService{
    private _httpClient = inject(HttpClient);

    getAllUsers() : Observable<User[]>{
        return this._httpClient.get<User[]>(`${environment.baseUrl}/users`);
    }

    getUserById(id : string) : Observable<User>{
        return this._httpClient.get<User>(`${environment.baseUrl}/users/${id}`);
    }

    addUser(user : User) : Observable<User>{
        return this._httpClient.post<User>(`${environment.baseUrl}/users`, user);
    }

    updateUser(updatedUser : User) : Observable<User>{
        return this._httpClient.put<User>(`${environment.baseUrl}/users/${updatedUser.id}`, updatedUser)
    }

    deleteUser(id : string) : Observable<void>{
        return this._httpClient.delete<void>(`${environment.baseUrl}/users/${id}`)
    }

    getDashboardState() : Observable<Statistics>{
        return this._httpClient.get<Statistics>(`${environment.baseUrl}/statistics`)
    }
}


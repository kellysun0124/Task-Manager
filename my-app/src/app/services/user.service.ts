import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, catchError, map, Observable, tap, throwError} from 'rxjs';
import {User} from "../models/user.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: User = { username: '', password: '' };

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(`${environment.apiUrl}login`, { username, password }).pipe(
      tap(response => {
        Object.assign(this.user, response);
      }),
      catchError(error => {
        console.log('Login error:', error);
        return throwError(() => error);
      })
    )
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}register`, user).pipe(
      catchError(error => {
        console.log('Registration error:', error);
        return throwError(() => error);
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, tap, throwError} from 'rxjs';
import {User} from "../models/user.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    const defaultUser: Partial<User> = {};
    this.userSubject = new BehaviorSubject<User>(defaultUser as User);
  }

  login(username: string, password: string) {
    const url = `${environment.apiUrl}login`;
    const body = { username, password };

    return this.http.post(url, body).pipe(
      catchError(error => {
        console.log('Login error:', error);
        return throwError(() => error);
      })
    )
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}register`, user).pipe(
      tap(user => {
        this.userSubject.next(user);
      }),
      catchError(error => {
        console.error('Registration error:', error);
        return throwError(() => new Error('Registration failed, please try again later.'));
      })
    );
  }
}

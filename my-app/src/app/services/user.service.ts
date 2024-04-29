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
    // Assuming the initial user does not need username and password initialized here
    const defaultUser: Partial<User> = {}; // Now empty since password should not be included
    this.userSubject = new BehaviorSubject<User>(defaultUser as User);
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>('http://44.223.33.61:3000/login', { username, password }).pipe(
      tap(user => {
        // Update BehaviorSubject with the logged-in user data
        this.userSubject.next(user);
      }),
      catchError(error => {
        // Log and handle errors appropriately
        console.error('Login error:', error);
        return throwError(() => new Error('Login failed, please try again later.'));
      })
    );
  }
}

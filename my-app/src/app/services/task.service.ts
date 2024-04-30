import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, throwError} from 'rxjs';
import { Task } from '../models/task.model';
import {environment} from "../../environments/environment";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor(private http: HttpClient, private userService: UserService) { }

  getTasks(): Observable<Task[]> {
    const user = this.userService.user;
    this.http.get<{message: string, tasks: Task[]}>(`${environment.apiUrl}tasks/${user.username}`).subscribe({
      next: (tasksData) => {
        console.log('Tasks:', tasksData);
        this.tasks = tasksData.tasks;
        this.tasksSubject.next([...this.tasks]);
      },
      error: (error) => {
        console.error('get task error:', error);
        return throwError(() => error);
      }
    })
    return this.tasksSubject.asObservable();
  }

  createTask(task: Task) {
    const res = this.http.post(`${environment.apiUrl}tasks`, task).pipe(
      catchError(error => {
        console.log('Task creation error:', error);
        return throwError(() => error);
      })
    )

    this.tasks = [...this.tasks, task];
    this.tasksSubject.next(this.tasks);
    return res;
  }

}

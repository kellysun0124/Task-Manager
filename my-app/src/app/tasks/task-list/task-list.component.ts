import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import { Task } from '../../models/task.model';
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css', '../tasks.component.css', '../../app.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  private tasksSubscription!: Subscription;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loading = true;
    this.errorMessage = '';

    this.tasksSubscription = this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (error) => {
        console.error('Task list error:', error);
        if (error.status === 404) {
          this.errorMessage = 'Please login first';
        } else {
          this.errorMessage = 'Failed to load tasks. Please try again.';
        }
        this.loading = false;
      }
    })
  }

  ngOnDestroy() {
    this.tasksSubscription.unsubscribe();
  }
}

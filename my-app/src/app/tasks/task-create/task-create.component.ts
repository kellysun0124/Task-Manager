import { Component } from '@angular/core';
import {TaskService} from "../../services/task.service";
import { Task } from '../../models/task.model';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css', '../tasks.component.css', '../../app.component.css']
})
export class TaskCreateComponent {
  title = '';
  description = '';
  dueDate = '';
  errorMessage = '';
  loading = false;
  private readonly username: string;

  constructor(private taskService: TaskService, private userService: UserService) {
    this.username = this.userService.user.username;
  }

  onCreateTask() {
    if (!this.title) {
      this.errorMessage = 'Title is required.';
      return;
    }

    if (this.dueDate) {
      const date = new Date(this.dueDate);
      if (isNaN(date.getTime())) {
        this.errorMessage = 'Invalid due date.';
        return;
      }
    }

    this.loading = true;
    this.errorMessage = '';

    const task : Task = { title: this.title, description: this.description, dueDate: this.dueDate, username: this.username }


    this.taskService.createTask(task).subscribe({
      next: (task) => {
        console.log('Task created successfully:', task);
        this.loading = false;
      },
      error: (error) => {
        console.error("Creating task failed: ", error);
        this.errorMessage = 'Creating task failed. Please try again.';
        this.loading = false;
      }
    });
  }
}

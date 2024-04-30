import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from '../models/user.model';
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../app.component.css']
})
export class RegisterComponent {
  username: string = '';
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  errorMessage: string = ''; // For displaying error messages
  loading: boolean = false; // For showing a loading indicator or disabling the button

  constructor(private router: Router, private userService: UserService) {}

  submitRegistration(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required.';
      return;
    }
    this.loading = true;
    const user: User = {
      username: this.username,
      firstName: this.firstname,
      lastName: this.lastname,
      email: this.email,
      phoneNumber: this.phone,
      password: this.password
    };

    this.userService.register(user).subscribe({
      next: (registeredUser) => {
        console.log('Registration successful:', registeredUser);
        this.router.navigate(['/login']);
        this.loading = false;
      },
      error: (error) => {
        console.error('Registration failed:', error);
        if (error.status === 409) {
          this.errorMessage = 'Username already exists. Please try again.';
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
        this.loading = false;
      }
    });
  }
}

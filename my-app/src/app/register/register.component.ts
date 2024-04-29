import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from '../models/user.model';
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
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
    this.loading = true; // Start loading
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
        this.router.navigate(['/login']); // Navigate to login or another appropriate route
        this.loading = false; // Stop loading
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this.errorMessage = error.message || 'Registration failed, please try again later.';
        this.loading = false; // Stop loading
      }
    });
  }
}

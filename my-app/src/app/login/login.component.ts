import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @HostBinding('attr.data-component-id') componentId = 'login';

  username: string = '';
  password: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router, private userService: UserService) {}

  submitLogin(): void {
    this.loading = true;
    this.errorMessage = ''; // Clear previous error messages if any

    this.userService.login(this.username, this.password).subscribe({
      next: (user) => {
        // Upon successful login
        console.log('Login successful:', user);
        this.router.navigate(['/tasks']); // Navigate to the dashboard or appropriate page
        this.loading = false; // Turn off the loading indicator
      },
      error: (error) => {
        // Handle login failure
        console.error('Login failed:', error);
        this.errorMessage = error.message || 'Login failed. Please try again.';
        this.loading = false; // Turn off the loading indicator
      }
    });
  }
}

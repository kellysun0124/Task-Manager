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
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.userService.login(this.username, this.password).subscribe({
      next: (user) => {
        console.log('Login successful:', user);
        this.router.navigate(['/tasks']);
        this.loading = false;
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = error.message || 'Login failed. Please try again.';
        if (error.status === 401) {
          this.errorMessage = 'Invalid login. Please try again.';
        } else if (error.status === 404) {
          this.errorMessage = 'Username not found. Please try again.';
        } else {
          this.errorMessage = 'Login failed. Please try again.';
        }
        this.loading = false;
      }
    });
  }
}

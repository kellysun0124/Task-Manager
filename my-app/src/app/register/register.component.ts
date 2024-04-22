import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

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

  constructor(private http: HttpClient) {}

  submitRegistration() {
    const userData = {
      userId: this.username,
      firstName: this.firstname,
      lastName: this.lastname,
      email: this.email,
      phone: this.phone,
      password: this.password
    };

    this.http.post<any>('http://localhost:3001/register', userData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
      },
      error: (error) => {
        console.error('Registration failed:', error);
      }
    });
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule], 
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {

  errors: String[] = [];

  loginForm = new FormGroup({
    formControlUser: new FormControl('', Validators.required),
    formControlPassword: new FormControl('', Validators.required)
  });

  constructor(private router: Router, private authService: Auth) {}

  validateForm() {
  this.errors = [];
  
  if (!this.loginForm.valid) {
    if (this.loginForm.get('formControlUser')?.hasError('required')) {
      this.errors.push('El usuario es obligatorio');
    }
    if (this.loginForm.get('formControlPassword')?.hasError('required')) {
      this.errors.push('La contraseña es obligatoria');
    }
  } else {
    const email = this.loginForm.value.formControlUser ?? '';
    const password = this.loginForm.value.formControlPassword ?? '';

    this.authService.login(String(email), String(password)).subscribe({
      next: (resp) => {
        localStorage.setItem('auth_token', resp.token);
        this.navigateToDashboard();
      },
      error: (err) => {
        this.errors = ['Las credenciales introducidas no son correctas.'];
        console.error('Login error:', err);
      }
    });
  }
}

  navigateToDashboard() {
    this.router.navigateByUrl('/dashboard'); 
  }

}
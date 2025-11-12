import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {

  errors:String [] = []

  loginForm = new FormGroup ({
    formControlUser: new FormControl('', Validators.required),
    formControlPassword: new FormControl('', Validators.required)
  });

  constructor (private router: Router) {}

  validateForm(){
    this.errors = []
    if(!this.loginForm.valid){
      if(this.loginForm.get('formControlUser')?.hasError('required')){
        this.errors.push('El usuario es obligatorio')
      }
      if(this.loginForm.get('formControlPassword')?.hasError('required')){
        this.errors.push('La contraseña es obligatoria')
      }
    } else{
      this.navigateToDashboard()
    }
  }

  navigateToDashboard () {
    this.router.navigateByUrl('/dashboard')
  }
  

}

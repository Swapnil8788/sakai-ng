import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { setUser } from '@/app/store/user/user.actions';
import { Auth } from '@/app/services/auth';
import { UserLoginResponse } from '@/app/types/user';




@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, PasswordModule, CheckboxModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true
})
export class Login implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })
  auth = new Auth();
  constructor(private router: Router, private store: Store,) { }

  ngOnInit() {
    this.auth.logout().subscribe({
      next: (res) => {
        localStorage.clear();
        this.router.navigate(['auth/login']);
        console.log("Logout successful", res);
      },
      error: (err) => {
        console.error("Logout failed", err);
      },
      complete: () => {
        console.log("Logout request completed");
      }
    });
  }
  registerUser() {
    this.router.navigate(['auth/registration']);
  }
  loginUser() {
    console.log(this.loginForm.value);
    const payload = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.auth.login(payload).subscribe({
      next: (res: UserLoginResponse | null) => {
        console.log(res);
        this.store.dispatch(
          setUser({
            email: payload.email,
            roles: res?.roles || []
          })
        )
        console.log("User roles from response:", res);
        localStorage.setItem('accessToken', res?.accessToken || '');
        localStorage.setItem('refreshToken', res?.refreshToken || '');
        this.router.navigate(['pages']);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Login request completed');
      }
    })
    // this.router.navigate(['pages']);
  }
  clicked() {
    console.log("clicked");
  }
}

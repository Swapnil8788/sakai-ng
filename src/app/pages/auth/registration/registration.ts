import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { Router } from '@angular/router';
import { MultiSelectModule } from 'primeng/multiselect';
import { Auth } from '@/app/services/auth';
import { registerUserDetails } from '@/app/types/user';



@Component({
  selector: 'app-registration',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, PasswordModule, CheckboxModule, FormsModule, MultiSelectModule],
  templateUrl: './registration.html',
  styleUrl: './registration.scss',
  standalone: true
})
export class Registration {
  auth = inject(Auth);
  registerForm: FormGroup;
  roleOptions: any[] = [
    { label: 'Admin', value: 'Admin' },
    { label: 'Employee', value: 'Employee' },
    { label: 'Manager', value: 'Manager' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm: ['', [Validators.required,]],
      phoneNo: ['', Validators.required],
      age: ['', Validators.required],
      roles: [[], Validators.required],
      isTnC: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.auth.getRoles().subscribe((roles: any) => {
      this.roleOptions = roles;
      console.log("roles", roles);
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirm')?.value
      ? null : { passwordMatchValidator: true };
  }

  addRole(role: string) {
    if (!role) return;

    const roles = this.registerForm.get('roles')?.value || [];
    roles.push(role);
    this.registerForm.get('roles')?.setValue(roles);
  }

  loginUser() {
    this.router.navigate(['auth/login']);

  }
  registerUser() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const payload: registerUserDetails = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirm: this.registerForm.value.confirm,
      phoneNo: this.registerForm.value.phoneNo,
      age: this.registerForm.value.age,
      roles: this.registerForm.value.roles
    }

    this.auth.register(payload).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['pages']);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Registration request completed');
      }
    }

    );


  }
}

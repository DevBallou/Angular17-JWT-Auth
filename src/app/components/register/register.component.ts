import { error } from 'console';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  form: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  errorMessage = '';
  passwordMismatch = false;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required])
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.form.get('password')?.valueChanges.subscribe(() => {
      this.checkPasswordMatch();
    });
    this.form.get('password_confirmation')?.valueChanges.subscribe(() => {
      this.checkPasswordMatch();
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('password_confirmation')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  checkPasswordMatch() {
    const password = this.form.get('password')?.value;
    const confirmPassword = this.form.get('password_confirmation')?.value;

    this.passwordMismatch != password !== confirmPassword &&
      this.form.get('password_confirmation')?.touched;
  }

  async submitRegister() {
    if (this.form.valid) {
      this.isLoading = true;
      try {
        await this.authService.register(this.form.value).subscribe({
          next: (response) => {
            this.router.navigate(['login']);
          }
        });
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    }
  }
}

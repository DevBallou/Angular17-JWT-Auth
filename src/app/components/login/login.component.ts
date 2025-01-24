import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  showPassword = false;
  isLoading = false;
  authService = inject(AuthService);
  router = inject(Router);
  errorMessage = '';

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void { }

  async submitLogin() {
    if (this.form.valid) {
      this.isLoading = true;
      try {
        await this.authService.login(this.form.value).subscribe({
          next: (response) => {
            this.router.navigate(['']);
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

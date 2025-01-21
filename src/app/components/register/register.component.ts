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
  form: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  submitRegister() {
    if (this.form.valid) {
      // console.log(this.form.value);
      this.authService.register(this.form.value).subscribe({
        next: (response) => {
          this.router.navigate(['login']);
        }
      });
    }
  }
}

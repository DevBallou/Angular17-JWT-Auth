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
  authService = inject(AuthService);
  router = inject(Router);

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void { }

  submitLogin() {
    if (this.form.valid) {
      // console.log(this.form.value);
      this.authService.login(this.form.value).subscribe({
        next: (response) => {
          this.router.navigate(['']);
        }
      });
    }
  }

}

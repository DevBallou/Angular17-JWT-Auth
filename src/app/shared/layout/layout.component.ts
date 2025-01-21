import { AuthService } from './../../core/services/auth.service';
import { Component, effect, Injector, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  authService = inject(AuthService);
  injector = inject(Injector);
  isLoggedIn = false;

  ngOnInit(): void {
    effect(() => {
      this.isLoggedIn = this.authService.isLoggedIn();
    }, { injector: this.injector });
  }

}

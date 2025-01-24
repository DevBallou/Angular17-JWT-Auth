import { Component, effect, inject, Injector, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  authService = inject(AuthService);
  injector = inject(Injector);
  isLoggedIn = false;

  ngOnInit(): void {
    effect(() => {
      this.isLoggedIn = this.authService.isLoggedIn();
    }, { injector: this.injector });
  }

  logout() {
    this.authService.logout();
  }

}

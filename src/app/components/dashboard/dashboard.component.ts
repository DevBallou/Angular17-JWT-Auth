import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/model/common.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  user!: User;
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.me().subscribe({
      next: (response) => {
        console.log(response);
        this.user = response.data;
      }
    })
  }

  logout() {
    this.authService.logout();
  }
}

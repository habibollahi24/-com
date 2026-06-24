import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainNavbarComponent } from './layout/main-navbar/main-navbar.component';
import { AuthService } from './auth/auth.service';
import { NotificationsComponent } from './shared/notifications/notifications.component';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MainNavbarComponent,
    NotificationsComponent,
    ProgressBarComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  readonly authService = inject(AuthService);

  ngOnInit() {
    this.authService.signedin().subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

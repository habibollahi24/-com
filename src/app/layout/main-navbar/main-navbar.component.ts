import { Component, inject, signal } from '@angular/core';
import { AuthRoutingModule } from '../../auth/auth-routing-module';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { AsyncPipe, NgClass } from '@angular/common';
import { NotificationsService } from '../../shared/notifications/notifications.service';

@Component({
  selector: 'app-main-navbar',
  imports: [AuthRoutingModule, AsyncPipe],
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.css',
})
export class MainNavbarComponent {
  readonly authService = inject(AuthService);
  readonly notificationsService = inject(NotificationsService);
  readonly router = inject(Router);

  readonly isLoadingSignout = signal(false);
  username$ = this.authService.username$;

  isAutenticated$ = this.authService.isAutenticated$;

  logout() {
    this.isLoadingSignout.set(true);
    this.authService.signout().subscribe(() => {
      this.isLoadingSignout.set(false);
      this.notificationsService.showSucces('Bye Bye');
      this.router.navigateByUrl('/');
    });
  }
}

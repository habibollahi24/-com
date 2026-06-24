import { Component, computed, inject, signal } from '@angular/core';
import { CreateEmailComponent } from '../create-email/create-email.component';
import { InboxListComponent } from '../inbox-list/inbox-list.component';
import { AuthRoutingModule } from '../../auth/auth-routing-module';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, pluck, tap } from 'rxjs';

@Component({
  selector: 'app-inbox-home',
  imports: [
    CreateEmailComponent,
    InboxListComponent,
    AuthRoutingModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public router = inject(Router);
  public location = inject(Location);
  public breakpointObserver = inject(BreakpointObserver);

  readonly isMobile$ = this.breakpointObserver
    .observe('(max-width:1020px)')
    .pipe(
      map((b) => b.matches),
      tap(console.log),
    );

  isNavigating = computed(() => !!this.router.currentNavigation());
}

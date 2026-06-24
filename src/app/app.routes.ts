import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { authGuard, inboxGuard } from './auth/auth-guard';
import { EmailPlaceholderComponent } from './inbox/email-placeholder/email-placeholder.component';
import { EmailComponent } from './inbox/email/email.component';
import { emailResolver } from './inbox/utils';
import { EmailNotFoundComponent } from './inbox/email-not-found/email-not-found.component';
import { InboxListComponent } from './inbox/inbox-list/inbox-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./auth/auth-module').then((m) => m.AuthModule),
    canActivate: [authGuard],
  },
  {
    path: 'inbox',
    loadComponent: () =>
      import('./inbox/home/home.component').then((c) => c.HomeComponent),
    canActivate: [inboxGuard],
    children: [
      { path: '', component: EmailPlaceholderComponent },
      // { path: 'list', component: InboxListComponent },
      { path: 'not-found', component: EmailNotFoundComponent },
      {
        path: ':id',
        component: EmailComponent,
        resolve: { email: emailResolver },
      },
    ],
  },
];

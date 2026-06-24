import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RedirectCommand,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Email, EmailsService } from './emails.service';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const emailResolver = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const emailService = inject(EmailsService);
  const router = inject(Router);
  const emailId = route.paramMap.get('id');

  if (!emailId) {
    return router.navigate(['/inbox/not-found']);
  }

  return emailService.getEmail(emailId).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 404) {
        router.navigate(['/inbox/not-found']);
      }
      return EMPTY;
    }),
  );
};

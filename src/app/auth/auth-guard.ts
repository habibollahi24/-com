import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { skipWhile } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const inboxGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService.isAutenticated$
    .pipe(skipWhile((value) => value === null))
    .subscribe({
      next: (value) => {
        // if (!value) {
        //   router.navigateByUrl('/auth/signin');
        // }
      },
      error: (error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse && error.status === 422) {
          router.navigateByUrl('/auth/signin');
        }
      },
    });

  return true;
};
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService.isAutenticated$
    .pipe(skipWhile((value) => value === null))
    .subscribe({
      next: (value) => {
        if (value) {
          router.navigateByUrl('/inbox');
        }
      },
    });

  return true;
};

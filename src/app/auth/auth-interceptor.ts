import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import {
  catchError,
  EMPTY,
  Observable,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';
import { AuthService } from './auth.service';
import { NotificationsService } from '../shared/notifications/notifications.service';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const notificationService = inject(NotificationsService);
  const newReq = req.clone({
    withCredentials: true,
  });
  return next(newReq).pipe(
    timeout(10000),
    catchError((error) => {
      if (error instanceof TimeoutError) {
        authService.setIsAutenticatedState(false);
        notificationService.showError(
          'Poor Internet Conection , Please Refresh page',
        );
      }

      if (error instanceof HttpErrorResponse || error.status === 500) {
        notificationService.showError('offline , check your network');
      }
      return throwError(() => error);
    }),
  );
}

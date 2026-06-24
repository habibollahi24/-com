import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { ProgresbarService } from './progresbar.service';

export function progressbarInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const progresbarService = inject(ProgresbarService);

  progresbarService.start();

  return next(req).pipe(finalize(() => progresbarService.stop()));
}

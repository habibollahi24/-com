import { Injectable } from '@angular/core';
import { scan, Subject, tap } from 'rxjs';

interface Notification {
  id: number;
  message: string;
  status: 'error' | 'succes' | 'clear';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private notificationSubject = new Subject<Notification>();

  notifications$ = this.notificationSubject.asObservable().pipe(
    scan((acc, cur) => {
      if (cur.status === 'clear') {
        return acc.filter((notif) => notif.id !== cur.id);
      }
      return [...acc, cur];
    }, [] as Notification[]),
    tap((c) => console.log(c, 'in tap')),
  );

  showError(message: string) {
    const id = Math.random() * 10000;
    this.notificationSubject.next({
      id,
      message,
      status: 'error',
    });
    setTimeout(() => {
      this.clear(id);
    }, 5000);
  }
  showSucces(message: string) {
    const id = Math.random() * 10000;
    this.notificationSubject.next({
      id,
      message,
      status: 'succes',
    });
    setTimeout(() => {
      this.clear(id);
    }, 5000);
  }

  clear(id: number) {
    this.notificationSubject.next({
      id,
      message: 'Clear',
      status: 'clear',
    });
  }
}

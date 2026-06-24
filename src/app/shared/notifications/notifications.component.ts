import { Component, inject } from '@angular/core';
import { NotificationsService } from './notifications.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notifications',
  imports: [AsyncPipe],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent {
  notificationService = inject(NotificationsService);

  notifications$ = this.notificationService.notifications$;

  onDelete(id: number) {
    this.notificationService.clear(id);
  }
}

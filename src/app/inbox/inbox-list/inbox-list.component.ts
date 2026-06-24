import { Component, inject } from '@angular/core';
import { EmailsService } from '../emails.service';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from '../../auth/auth-routing-module';

@Component({
  selector: 'app-inbox-list',
  imports: [CommonModule, AuthRoutingModule],
  templateUrl: './inbox-list.component.html',
  styleUrl: './inbox-list.component.css',
})
export class InboxListComponent {
  emailsService = inject(EmailsService);

  emails$ = this.emailsService.getEmails();
}

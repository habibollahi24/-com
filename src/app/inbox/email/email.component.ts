import { CommonModule } from '@angular/common';
import { Component, input, ViewEncapsulation } from '@angular/core';
import { Email } from '../emails.service';
import { ReplayEmailComponent } from '../replay-email/replay-email.component';

@Component({
  selector: 'app-email',
  imports: [CommonModule, ReplayEmailComponent],
  templateUrl: './email.component.html',
  styleUrl: './email.component.css',
})
export class EmailComponent {
  email = input.required<Email>();
}

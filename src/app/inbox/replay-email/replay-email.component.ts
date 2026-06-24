import { Component, inject, input } from '@angular/core';
import { ModalService } from '../../shared/modal/modal.service';

import { CreateEmailFormComponent } from '../email-form/email-form.component';
import { Email } from '../emails.service';

@Component({
  selector: 'app-replay-email',
  imports: [],
  templateUrl: './replay-email.component.html',
  styleUrl: './replay-email.component.css',
})
export class ReplayEmailComponent {
  modalService = inject(ModalService);

  email = input.required<Email>();

  replayEmail() {
    const ref = this.modalService.open(CreateEmailFormComponent, {
      to: this.email().from,
      from: this.email().to,
      subject: '',
      text: '',
    });

    ref.afterClosed$.subscribe((result) => {
      console.log(result);
    });
  }
}

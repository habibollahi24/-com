import { Component, inject, signal } from '@angular/core';
import { MODAL_DATA, MODAL_REF } from '../../shared/modal/modal.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedModule } from '../../shared/shared-module';
import { EmailsService } from '../emails.service';
import { NotificationsService } from '../../shared/notifications/notifications.service';

@Component({
  selector: 'app-create-email-form',
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  templateUrl: './email-form.component.html',
})
export class CreateEmailFormComponent {
  data = inject(MODAL_DATA);
  modalRef = inject(MODAL_REF);
  email = inject(EmailsService);
  notificationsService = inject(NotificationsService);

  readonly loading = signal(false);

  emailForm!: FormGroup<{
    to: FormControl<any>;
    from: FormControl<any>;
    subject: FormControl<any>;
    text: FormControl<any>;
  }>;

  ngOnInit(): void {
    this.emailForm = new FormGroup({
      to: new FormControl(this.data.to, [
        Validators.required,
        Validators.email,
      ]),
      from: new FormControl({ value: this.data.from, disabled: true }),
      subject: new FormControl(this.data.subject, [
        Validators.required,
        Validators.minLength(3),
      ]),
      text: new FormControl(this.data.text, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  save() {
    console.log(this.emailForm.getRawValue());
    this.loading.set(true);
    this.email.createEmail(this.emailForm.getRawValue()).subscribe({
      next: (response) => {
        this.loading.set(false);
        this.modalRef.close();
        this.notificationsService.showSucces('Yup ! Created Real Email');
      },
      error: (error) => {
        this.loading.set(false);
        this.modalRef.close();
        this.notificationsService.showError('plese try again');
      },
    });
  }
}

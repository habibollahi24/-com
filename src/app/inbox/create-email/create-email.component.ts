import { Component, inject } from '@angular/core';
import { ModalService } from '../../shared/modal/modal.service';
import { CreateEmailFormComponent } from '../email-form/email-form.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-create-email',

  templateUrl: './create-email.component.html',
})
export class CreateEmailComponent {
  modalService = inject(ModalService);
  authService = inject(AuthService);

  username = '';
  result: any;

  createCompose() {
    const ref = this.modalService.open(CreateEmailFormComponent, {
      to: '',
      from: this.username,
      subject: '',
      text: '',
    });

    ref.afterClosed$.subscribe((result) => {
      console.log(result);
    });
  }

  ngOnInit(): void {
    this.authService.username$.subscribe(
      (username) => (this.username = username),
    );
  }
}

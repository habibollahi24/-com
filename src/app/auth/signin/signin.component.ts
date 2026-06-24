import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../../shared/notifications/notifications.service';

@Component({
  selector: 'app-signin',
  standalone: false,
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  readonly fb = inject(FormBuilder);
  readonly router = inject(Router);

  readonly authService = inject(AuthService);
  readonly notificationsService = inject(NotificationsService);

  readonly isSubmiting = signal(false);

  signInForm = this.fb.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]+$/),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    this.isSubmiting.set(true);
    this.authService.signin(this.signInForm.value).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/inbox');
        this.notificationsService.showSucces('Welcome to @com');
        this.isSubmiting.set(false);
      },
      error: (err) => {
        console.log(err);
        this.isSubmiting.set(false);
        this.signInForm.setErrors({ signinError: true });
      },
    });
  }
}

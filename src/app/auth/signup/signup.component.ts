import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { checkEqualPasswords } from '../validation/checkEqualPasswords';

import { UsernameAvailable } from '../validation/username-available';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  readonly router = inject(Router);
  readonly usernameAvailable = inject(UsernameAvailable);
  readonly authService = inject(AuthService);
  readonly fb = inject(FormBuilder);

  readonly isSubmiting = signal(false);

  signUpForm = this.fb.group(
    {
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]+$/),
        ],
        // [this.usernameAvailable.validate],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: [
        '',
        [Validators.required, Validators.minLength(6)],
      ],
    },
    { validators: [checkEqualPasswords('password', 'passwordConfirmation')] },
  );

  // signUpForm = new FormGroup({
  //   username: new FormControl('', {
  //     validators: [
  //       Validators.required,
  //       Validators.minLength(3),
  //       Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]+$/),
  //     ],
  //     // asyncValidators: [this.usernameAvailable.validate],
  //   }),
  //   passwordGroup: new FormGroup(
  //     {
  //       password: new FormControl('', [
  //         Validators.required,
  //         Validators.minLength(6),
  //       ]),
  //       passwordConfirmation: new FormControl('', [
  //         Validators.required,
  //         Validators.minLength(6),
  //       ]),
  //     },
  //     [checkEqualPasswords('password', 'passwordConfirmation')],
  //   ),
  // });
  // signUpForm = new FormGroup({
  //   username: new FormControl('', {
  //     validators: [
  //       Validators.required,
  //       Validators.minLength(3),
  //       Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]+$/),
  //     ],
  //     // asyncValidators: [this.usernameAvailable.validate],
  //   }),
  //   passwordGroup: new FormGroup(
  //     {
  //       password: new FormControl('', [
  //         Validators.required,
  //         Validators.minLength(6),
  //       ]),
  //       passwordConfirmation: new FormControl('', [
  //         Validators.required,
  //         Validators.minLength(6),
  //       ]),
  //     },
  //     [checkEqualPasswords('password', 'passwordConfirmation')],
  //   ),
  // });

  onSubmit() {
    this.isSubmiting.set(true);
    this.authService.signup(this.signUpForm.value).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/');
        this.isSubmiting.set(false);
      },
      error: (err) => {
        console.log(err);
        this.isSubmiting.set(false);
      },
    });
  }
}

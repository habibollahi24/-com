import { Component, computed, Input, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-field',
  standalone: false,
  template: `
    @if (message) {
      <span class="help is-danger">{{ message }}</span>
    }
  `,
})
export class ErrorFieldComponent {
  @Input() control!: AbstractControl;

  constructor() {}

  get message() {
    const ERROR_MESSAGE = {
      required: () => 'field is required',
      minlength: (error: any) => `minimum length ${error.requiredLength}`,
      maxlength: (error: any) => `maximum length ${error.requiredLength}`,
      pattern: () => `the pattern not match`,
      passwordDontMatch: () => `pass and confirm not match`,
      signinError: () => `username or password not correct`,
      email: () => `emai not valid`,
    };
    const errors = this.control.errors;
    if (!errors || !this.control.touched) {
      return '';
    }

    const firstError = Object.keys(errors)[0];

    const findError = ERROR_MESSAGE[firstError as keyof typeof ERROR_MESSAGE];

    return findError?.(errors[firstError]) ?? '';
  }
}

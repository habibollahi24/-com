import { AbstractControl } from '@angular/forms';

export function checkEqualPasswords(pass1: string, pass2: string) {
  return (contorol: AbstractControl) => {
    const password = contorol.get(pass1)?.value;
    const passwordConfirmation = contorol.get(pass2)?.value;

    if (password === passwordConfirmation) {
      return null;
    }
    return {
      passwordDontMatch: true,
    };
  };
}

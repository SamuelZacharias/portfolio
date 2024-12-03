import { AbstractControl, ValidationErrors } from '@angular/forms';

export function strictEmailValidator(control: AbstractControl): ValidationErrors | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email mit mindestens einem Punkt in der Domain
  const valid = emailRegex.test(control.value);
  return valid ? null : { strictEmail: true };
}

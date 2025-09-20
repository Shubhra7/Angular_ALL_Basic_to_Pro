import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function specialCharValidator(char: string): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    if (!value) return null; // allow empty
    if (value.includes(char)) {
      return { invalidSpecialChar: true };
    }
    return null;

  };
}

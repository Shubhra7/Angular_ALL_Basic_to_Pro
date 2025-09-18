import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appEmailvalidator]',
  providers:[
    {
      // need this injection token to do
      provide: NG_VALIDATORS,
      useExisting: Emailvalidator,
      multi: true
    }
  ]
})

// need to implement Validator
export class Emailvalidator implements Validator {

  constructor() { }

  // Validator interface give this validate()
  validate(control: AbstractControl): ValidationErrors | null {
      const value = control.value as string;
      if(!value.includes('@')){
        return {invalidEmail: true}
      }
      return null
  }

}

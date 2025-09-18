import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appPricevalidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: Pricevalidator,
      multi: true
    }
  ]
})
export class Pricevalidator implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
      return control.value > 0 ? null : {positivePrice: true}
  }

}

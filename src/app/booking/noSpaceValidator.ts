import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const noSpaceValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>{
    const value = control.value;
    if(!value) return null; //allow empty value
    return value.includes(' ') ? {noSpace : true} : null;
}
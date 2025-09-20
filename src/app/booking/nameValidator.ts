import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const nameValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>{
    const value= control.value as String;
    
    if(!value) return null; //allow empty value

    if(value.includes('test')){
        return {invalidName: true}
    }
    return null;
}
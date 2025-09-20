import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function dateValidator(control : FormGroup): ValidationErrors | null {

    const checkinDate: any = new Date(control.get('checkinDate')?.value);
    const checkoutDate: any = new Date(control.get('checkoutDate')?.value);
    const diffTime = checkoutDate - checkinDate
    const diffDays = Math.ceil(diffTime / (1000*60*60*24))
    // console.log(diffDays);
    // console.log(diffTime);

    if(diffDays <= 0){
        control.get('checkoutDate')?.setErrors({invalidDate : true})
        return {
            invalidDate : true,
        };
    }
    return null;
}

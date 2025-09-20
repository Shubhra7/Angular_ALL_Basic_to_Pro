import { CanDeactivateFn } from '@angular/router';
import { Booking } from '../booking';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export const bookingGuard: CanDeactivateFn<Booking> = (component, currentRoute, currentState, nextState) => {
  const _snackBar = inject(MatSnackBar);
  if(component.bookingForm.pristine){
    return component.bookingForm.pristine;
  }else{
    _snackBar.open('You have unsaved changes', 'DISCARD');
    return false;
  }
};

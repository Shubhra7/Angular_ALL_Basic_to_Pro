import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-booking',
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButton,
    MatExpansionModule,
    MatCheckboxModule,
  ],
  templateUrl: './booking.html',
  styleUrl: './booking.scss',
  providers: [provideNativeDateAdapter()],
})
export class Booking {
  bookingForm!: FormGroup;

  passPortCheck: boolean = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.bookingForm = this.fb.group({
      // new FormControl('') & ['']  are  same
      roomId: new FormControl({ value: '2', disabled: true }, [
        Validators.required,
      ]),
      guestEmail: ['', [Validators.required, Validators.email]],
      guestName: ['', [Validators.required, Validators.minLength(5)]],
      checkinDate: new FormControl(''),
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: [''],
      address: this.fb.group({
        addressLine1: [''],
        addressLine2: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),

      guests: this.fb.array([
        //For adding functionality like click add to add guest info
        this.fb.group({
          guestName: [''],
          age: new FormControl(''),
        }),
      ]),

      tnc: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  addBooking() {
    // console.log(this.bookingForm.value)
    console.log(this.bookingForm.getRawValue()); //For getting the value of the disabled state also

    // reset the form
    this.bookingForm.reset({
      roomId: '2',
      guestEmail: '',
      guestName: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      address:{
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false,

    });
  }

  get guests(): FormArray {
    return this.bookingForm.get('guests') as FormArray;
  }

  // Add Guest button implementation
  addGuest() {
    // take it from Getter
    this.guests.push(
      this.fb.group({
        guestName: [''],
        age: new FormControl(''),
      })
    );
  }

  // addControl
  addPassPort() {
    this.bookingForm.addControl('passport', new FormControl(''));
    this.passPortCheck = !this.passPortCheck;
  }

  // removeControl
  deletePassPort() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
    this.passPortCheck = !this.passPortCheck;
  }

  // removeGuest
  removeGuest(index: number) {
    this.guests.removeAt(index);
  }
}

// export class BookingSchema{
//   roomId
// }

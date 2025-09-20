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
import { noSpaceValidator } from './noSpaceValidator';
import { BookingService } from './booking-service';
import { exhaustMap, mergeMap, switchMap } from 'rxjs';
import { nameValidator } from './nameValidator';
import { specialCharValidator } from './specialCharValidator';
import { dateValidator } from './dateValidator';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const roomId = this.route.snapshot.paramMap.get('roomid');
    
    this.bookingForm = this.fb.group(
      {
        // new FormControl('') & ['']  are  same
        roomId: new FormControl({ value: roomId, disabled: true }, [
          Validators.required,
        ]),
        guestEmail: [
          '',
          {
            updateOn: 'blur',
            validators: [Validators.required, Validators.email],
          },
        ],
        guestName: ['', [Validators.required, Validators.minLength(5),nameValidator,specialCharValidator('@')]],
        checkinDate: new FormControl(''),
        checkoutDate: [''],
        bookingStatus: [''],
        bookingAmount: [''],
        bookingDate: [''],
        mobileNumber: [
          '',
          {
            updateOn: 'blur', //helps in bookingForm.valueChanges
            validators: [Validators.required],
          },
        ],
        address: this.fb.group({
          addressLine1: ['', [Validators.required]],
          addressLine2: [''],
          city: ['', [Validators.required]],
          state: ['', [Validators.required]],
          country: [''],
          zipCode: ['', noSpaceValidator],
        }),

        guests: this.fb.array([
          //For adding functionality like click add to add guest info
          this.fb.group({
            guestName: ['', [Validators.required]],
            age: new FormControl(''),
          }),
        ]),

        tnc: new FormControl(false, [Validators.requiredTrue]),
      },
      {
        updateOn: 'blur',
        validators: [dateValidator],
      }
    );

    // whenever any changes the stream will say here
    // this.bookingForm.valueChanges.subscribe((data) => {
    //   this.bookingService.bookRoom(data).subscribe((data)=>{})
    // });

    this.bookingForm.valueChanges.pipe(

    // mergeMap → every event matters.
    //   mergeMap((data) => this.bookingService.bookRoom(data))
    // ).subscribe((data) => console.log(data))


    // switchMap → only latest event matters.
    //   switchMap((data) => this.bookingService.bookRoom(data))
    // ).subscribe((data) => console.log(data))


    // exhaustMap → first event matters, ignore rest until done.
    exhaustMap((data) => this.bookingService.bookRoom(data))
    ).subscribe((data) => console.log(data))

  }

  addBooking() {
    // console.log(this.bookingForm.value)
    console.log("hello form submitted data: ");
    
    console.log(this.bookingForm.getRawValue()); //For getting the value of the disabled state also

    // this.bookingService
    //   .bookRoom(this.bookingForm.getRawValue())
    //   .subscribe((data) => {
    //     console.log(data);
    //   });

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
      address: {
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

    // this.getBookingData()


  }

  getBookingData() {
    // Need to pass all values in setValue
    // this.bookingForm.setValue({
    //   roomId: '2',
    //   guestEmail: 'test@gmail.com',
    //   guestName: '',
    //   checkinDate: new Date('10-Feb-2026'),
    //   checkoutDate: '',
    //   bookingStatus: '',
    //   bookingAmount: '',
    //   bookingDate: '',
    //   mobileNumber: '',
    //   address:{
    //     addressLine1: '',
    //     addressLine2: '',
    //     city: '',
    //     state: '',
    //     country: '',
    //     zipCode: '',
    //   },
    //   guests: [],
    //   tnc: false,
    // })
    // Can pass some values in patchValue
    // this.bookingForm.patchValue({
    //   roomId: '2',
    //   guestEmail: 'test@gmail.com',
    //   guestName: '',
    // })
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

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-rooms-booking',
  imports: [AsyncPipe],
  templateUrl: './rooms-booking.html',
  styleUrl: './rooms-booking.scss',
})
export class RoomsBooking {
  // ActivatedRoute default service for taking routes
  router = inject(ActivatedRoute);
  id!: number;

  // because paramMap return Observable<string | null> 
  id$ !: Observable<string | null>;

  ngOnInit() {

    // Best Practice:

    // this.id$ = this.router.params.pipe(
    //   map(params => params['roomid'])
    // )

    // OR

    this.id$ = this.router.paramMap.pipe(
      map((params) => params.get('roomid'))
    )

    // snapsshot also static means in same view it will not take changes value
    // this.id = this.router.snapshot.params['roomid']

    // but subscribe can do memory leakage => can prevent by unsubscribe during ngOnDestory
    // this.router.params.subscribe((params) => {
    //   console.log(params);
    //   this.id = params['roomid']
    // });
  }
}

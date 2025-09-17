import { Component,signal } from '@angular/core';
import { Room, RoomList } from './roomsType';
import { CurrencyPipe, DecimalPipe, NgIf, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { NgClass } from '@angular/common';
import { NgStyle } from '@angular/common';
import { DatePipe } from '@angular/common';
import { LowerCasePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-rooms',
  // imports: [ NgIf ],
  imports: [NgStyle, DatePipe , UpperCasePipe, TitleCasePipe, CurrencyPipe, DecimalPipe ],
  templateUrl: './rooms.html',
  styleUrl: './rooms.scss',
})
export class Rooms {
  hotelName = signal('Obera@Shubhra');
  numberOfRooms: number = 10;

  hideRooms = false;

  rooms: Room = { totalRooms: 9, availableRooms: 3, bookedRooms: 1 };

  allRooms: Room[] = [
    { totalRooms: 9, availableRooms: 3, bookedRooms: 1 },
    { totalRooms: 9, availableRooms: 3, bookedRooms: 1 },
    { totalRooms: 9, availableRooms: 3, bookedRooms: 1 },
  ]

  roomList : RoomList[] = [
    {
    roomType: 'Deluxe Room',
    amenities: 'Air Conditionar, Free wifi, Tv, Bathroom-Tub, Kitchen',
    price: 9000,
    photos: 'https://image...',
    checkinTime: new Date('11-Nov-2021'),
    checkoutTime: new Date('12-Nov-2021'),
    rating: 2.3
    },
    {
    roomType: 'Public Room',
    amenities: 'Air Conditionar, Free wifi, Tv, Bathroom-Tub, Kitchen',
    price: 9000,
    photos: 'https://image...',
    checkinTime: new Date('11-Nov-2021'),
    checkoutTime: new Date('12-Nov-2021'),
    rating: 4.6
    },
    {
    roomType: 'Public Room',
    amenities: 'Air Conditionar, Free wifi, Tv, Bathroom-Tub, Kitchen',
    price: 9000,
    photos: 'https://image...',
    checkinTime: new Date('11-Nov-2021'),
    checkoutTime: new Date('12-Nov-2021'),
    rating: 5.3
    },
    {
    roomType: 'Private Room',
    amenities: 'Air Conditionar, Free wifi, Tv, Bathroom-Tub, Kitchen',
    price: 9000,
    photos: 'https://image...',
    checkinTime: new Date('11-Nov-2021'),
    checkoutTime: new Date('12-Nov-2021'),
    rating: 8
    },
  ]

  toggle() {
    this.hideRooms = !this.hideRooms;
  }



  // Modal things
  constructor(private modalService: NgbModal){}

  openModal(content: any){
    this.modalService.open(content,{ size:'lg' });
  }

}

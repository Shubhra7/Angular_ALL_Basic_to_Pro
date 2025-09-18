import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { JsonPipe, NgStyle } from '@angular/common';
import { RoomList } from '../roomsType';
import { Rooms as RoomsService } from '../services/rooms';
import { Pricevalidator } from '../../pricevalidator/pricevalidator';

@Component({
  selector: 'app-rooms-add',
  imports: [FormsModule, NgStyle, JsonPipe, Pricevalidator],
  templateUrl: './rooms-add.html',
  styleUrl: './rooms-add.scss',
})
export class RoomsAdd {
  room: RoomList = {
    roomType: '',
    amenities: '',
    checkinTime: new Date(),
    checkoutTime: new Date(),
    photos: '',
    price: 0,
    rating: 0,
  };

  sucessMessage: string = '';

  constructor(private roomService: RoomsService) {}

  AddRoom(roomsForm: NgForm) {
    this.roomService.addRooms(this.room).subscribe((data) => {
      this.sucessMessage = 'Room Added Successfully';
      // roomsForm.reset();  // will give data type null value

      // reset form with some default value
      roomsForm.resetForm({
        roomType: '',
        amenities: '',
        checkinTime: new Date(),
        checkoutTime: new Date(),
        photos: '',
        price: 0,
        rating: 0,
      });
    });
  }
}

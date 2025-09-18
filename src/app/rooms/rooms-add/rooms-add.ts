import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe, NgStyle } from '@angular/common';
import { RoomList } from '../roomsType';
@Component({
  selector: 'app-rooms-add',
  imports: [FormsModule, NgStyle, JsonPipe],
  templateUrl: './rooms-add.html',
  styleUrl: './rooms-add.scss'
})
export class RoomsAdd {

  room : RoomList = {
    roomType: '',
    amenities: '',
    checkinTime: new Date(),
    checkoutTime: new Date(),
    photos: '',
    price: 0,
    rating: 0
  }

}

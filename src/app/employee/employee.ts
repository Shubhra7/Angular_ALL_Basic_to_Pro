import { Component, Self } from '@angular/core';
import { Rooms as RoomService } from '../rooms/services/rooms';

@Component({
  selector: 'app-employee',
  imports: [],
  templateUrl: './employee.html',
  styleUrl: './employee.scss',
  providers:[RoomService]
})
export class Employee {
  empName:string = 'Jhon'

  //  By adding @Self(), Only look in the injector of the current class.**** Don’t check parents.****

  constructor(@Self() private roomService: RoomService){
  }
}

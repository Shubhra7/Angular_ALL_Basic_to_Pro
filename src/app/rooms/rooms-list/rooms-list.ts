import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { RoomList } from '../roomsType';
import { CurrencyPipe, DatePipe, DecimalPipe, JsonPipe, NgStyle, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-rooms-list',
  imports: [NgStyle, DatePipe, UpperCasePipe, TitleCasePipe, CurrencyPipe, DecimalPipe, RouterLink],
  templateUrl: './rooms-list.html',
  styleUrl: './rooms-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  
  // Change detection of optimized the UI render for @Input reference change, internal events, or async pipes; faster but needs immutable updates.

})
export class RoomsList {
  @Input() rooms: RoomList[] =[];
  @Input() title: string= '';

  @Output() selectedRoom = new EventEmitter<RoomList>();

  selectRoom(item: RoomList){
    this.selectedRoom.emit(item);
  }


  //ngOnChanges ==> when @Input changes it will take care with chages
  ngOnChanges(changes: SimpleChanges):void{
    console.log(changes);
    if(changes['title']){
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  // get destory by toggle button in rooms.ts
  ngOnDestroy(){
    console.log('On destroy is called from room-list.ts!!');
    
  }

}

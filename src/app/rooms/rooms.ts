import { Component, inject, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './roomsType';
import {
  CurrencyPipe,
  DecimalPipe,
  JsonPipe,
  NgIf,
  SlicePipe,
  TitleCasePipe,
  UpperCasePipe,
  AsyncPipe
} from '@angular/common';
import { RoomsList } from './rooms-list/rooms-list';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Header } from '../header/header';
import { Rooms as RoomsService } from './services/rooms';
import { catchError, map, Observable, of, Subject, Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Config } from '../services/config';
import { RouteConfigToken } from '../services/routeConfig.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  // imports: [ NgIf ],
  imports: [RoomsList, JsonPipe, Header, AsyncPipe, RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './rooms.html',
  styleUrl: './rooms.scss',
  providers: [
    {
      provide: RouteConfigToken,
      useValue: {title: 'Room'}
    }
  ]
})

export class Rooms {
  hotelName = signal('Obera@Shubhra');
  'numberOfRooms': number = 10;

  subscription! : Subscription;

  rooms$
  getErrors$
  roomsCount$


  priceFilter = new FormControl(0)


  // Subject: A Subject is both an Observable and an Observer at the same time. so You can subscribe to it (like any Observable). and also You can also push values into it using next().
  error$ = new Subject<string>();

  // Another way to inject service
  // private roomsService = inject(RoomsService)

   // Service inject and Modal things
  constructor(private modalService: NgbModal, private roomsService : RoomsService, private configService : Config) {

    this.getErrors$ = this.error$.asObservable();

    // catchError ==> to handle observable error
    this.rooms$ = this.roomsService.getRooms$.pipe(

      catchError((err) => {
        console.log(err);
        this.error$.next(err.message);
        return of([]);


      })
    )

    this.roomsCount$ = this.roomsService.getRooms$.pipe(
      map((rooms) => rooms.length)
    )
  }

  openModal(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }




  // // Creating own observable
  stream = new Observable(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    // observer.error('error');
  });


  // @ViewChild when we don't use the @input-@output but want to control the instance of the child component
  @ViewChild(Header) headerComponent!: Header;
  // @ViewChild(Header,{static: true}) headerComponent!: Header;

  // using @viewchild changing the child 'title' instance
  changeTitle(){
    this.headerComponent.title = "Kaluaa by @viewchild";
  }


  // for controlling more than one 
  @ViewChildren(Header) headerChildrenComponent! : QueryList<Header>;


  // ngDoCheck to detect all change detection cycle but don't use ngDoCheck -- very costly operation (not use ngDoCheck and ngOnChange together) 
  ngDoCheck(){
    console.log('on Changes is called--- from ngDoCheck inside room.ts');
    
  }

  title: string = 'Room List..'
  hideRooms = false;
  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Room List title toggle changes'
  }

  rooms: Room = { totalRooms: 9, availableRooms: 3, bookedRooms: 1 };

  allRooms: Room[] = [
    { totalRooms: 9, availableRooms: 3, bookedRooms: 1 },
    { totalRooms: 9, availableRooms: 3, bookedRooms: 1 },
    { totalRooms: 9, availableRooms: 3, bookedRooms: 1 },
  ];

  roomList: RoomList[] = [];


  totalBytes = 0

  // Life Cycle hooks

  // Helps like when fetch from api ==> like useEffect(()=>{},[])
  ngOnInit(): void {
    // console.log(this.headerComponent);

    //taking roomList data from Service 
    // this.roomList = this.roomsService.getRooms(); 

    // using Http get the data.
    this.subscription = this.roomsService.getRooms$.subscribe(rooms => {
      this.roomList = rooms;

    //check own created HttpRequest
    // **** This help to get more information to user about loading data, and all steps
    this.roomsService.getPhotos().subscribe((event)=>{
      console.log("From room.ts for photos created Reuqest --------")
      switch(event.type){
        case HttpEventType.Sent: {
          console.log('Request has been made!');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Response header has been received!');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
          break;
        }
      }
    })
    })


    // // doing with own making observarble
    this.stream.subscribe((data)=> console.log(data));
    this.stream.subscribe({
      next: (value) => console.log('Obserable value: ',value),
      complete: ()=> console.log('complete'),
      error: (err)=> console.log(err)
    })
      
  }

  ngAfterViewInit(){
    console.log("After View Init: ");
    console.log(this.headerComponent);
    this.headerComponent.title = "Kaluaa by @viewchild";
    this.headerChildrenComponent.last.title="children last @viewchildren"
  }

  ngAfterViewChecked(){
    // runs every time the view is checked. (in chrome development two times check happen => so two times console)
    console.log("hi from after view checked!!");
    
  }
  selectedRoom!: RoomList;

  // Take the selected room from child "room"
  selectTheRoom(room: RoomList) {
    this.selectedRoom = room;
    console.log(room);
  }

  addRoom() {
    const room: RoomList = {
      // roomNumber: '4',
      roomType: 'Private Added Room',
      amenities: 'ACC',
      price: 9000,
      photos: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      checkinTime: new Date('9-Nov-2025'),
      checkoutTime: new Date('12-Nov-2025'),
      rating: 9.3,
    };

    // POST data to backend
    this.roomsService.addRooms(room).subscribe((data)=>{
      this.roomList = data
    })
  
    // when in room-list.html (changeDetection: ChangeDetectionStrategy.Default,)
    // this.roomList.push(room)

    // When in room-list.html (changeDetection: ChangeDetectionStrategy.OnPush,)

    // doing immutable ==> change the both reference and data
    // this.roomList = [...this.roomList, room]
  }

  editRoom(){
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Private Update Room',
      amenities: 'ACC',
      price: 9000,
      photos: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      checkinTime: new Date('9-Nov-2025'),
      checkoutTime: new Date('12-Nov-2025'),
      rating: 9.3,
    };
    this.roomsService.editRoom(room).subscribe((data)=>{
      this.roomList = data
    })
  }

  deleteRoom(){
    this.roomsService.deleteRoom('3').subscribe((data)=>{
      this.roomList = data
    })
  }


  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }


}

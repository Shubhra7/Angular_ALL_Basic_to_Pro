import { Inject, Injectable } from '@angular/core';
import { Room, RoomList } from '../roomsType';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { AppConfig } from '../../AppConfig/appconfig.interface';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { PhotosType } from '../photosType';
import { shareReplay } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class Rooms {

  getRooms$
  // headers

  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig, private http: HttpClient){
    console.log("**************Room Service initialized!!!!");
    // take value from value provider in appConfig.service
    console.log(this.config.apiEndPoint);

    // this.headers = new HttpHeaders({'token':'1234asdasd6'})

    // Using shareReplay for caching data
    this.getRooms$ = this.http.get<RoomList[]>('/api/rooms').pipe(shareReplay(1))
    
  }

  roomList: RoomList[] = [];
  // roomList: RoomList[] = [
  //   {
  //     roomType: 'Deluxe Room',
  //     amenities: 'Air Conditionar, Free wifi, Tv, Bathroom-Tub, Kitchen',
  //     price: 9000,
  //     photos: 'https://image...',
  //     checkinTime: new Date('11-Nov-2021'),
  //     checkoutTime: new Date('12-Nov-2021'),
  //     rating: 2.3,
  //   },
  //   {
  //     roomType: 'Public Room',
  //     amenities: 'Air Conditionar, Free wifi, Tv, Bathroom-Tub, Kitchen',
  //     price: 9000,
  //     photos: 'https://image...',
  //     checkinTime: new Date('11-Nov-2021'),
  //     checkoutTime: new Date('12-Nov-2021'),
  //     rating: 4.6,
  //   },
  //   {
  //     roomType: 'Public Room',
  //     amenities: 'Air Conditionar, Free wifi, Tv, Bathroom-Tub, Kitchen',
  //     price: 9000,
  //     photos: 'https://image...',
  //     checkinTime: new Date('11-Nov-2021'),
  //     checkoutTime: new Date('12-Nov-2021'),
  //     rating: 5.3,
  //   },
  //   {
  //     roomType: 'Private Room',
  //     amenities: 'Air Conditionar, Free wifi, Tv, Bathroom-Tub, Kitchen',
  //     price: 9000,
  //     photos: 'https://image...',
  //     checkinTime: new Date('11-Nov-2021'),
  //     checkoutTime: new Date('12-Nov-2021'),
  //     rating: 8,
  //   },
  // ];



  // Get Request
  getRooms() {
    return this.http.get<RoomList[]>('/api/rooms',);
  }

  // Post Request
  addRooms(room: RoomList){
    return this.http.post<RoomList[]>('/api/rooms',room)
  }

  // To update the room :3
  editRoom(room: RoomList){
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`,room)
  }

  // To delete the room: 3
  deleteRoom(id: string){
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`)
  }


  getPhotos(){
    const request = new HttpRequest('GET',`https://jsonplaceholder.typicode.com/photos`,{
      reportProgress: true, 
      // { reportProgress: true } → tells Angular to emit events (upload, download progress, etc.) instead of only the final response.
    })
    return this.http.request<PhotosType[]>(request)
  }

}

import { Routes } from "@angular/router";
import { Rooms } from "./rooms";
import { RoomsList } from "./rooms-list/rooms-list";
import { RoomsAdd } from "./rooms-add/rooms-add";
import { RoomsBooking } from "./rooms-booking/rooms-booking";


export const ROOMS_ROUTES: Routes = [
    {
        path:'',
        component: Rooms,
        children: [

            // Lazy Loading
            {
                path: 'list', 
                loadComponent: ()=> import('./rooms-list/rooms-list').then(m=> m.RoomsList)    
            },

            {path: 'addy', component: RoomsAdd},
            {path: ':roomid', component: RoomsBooking},
        ]
    }
]
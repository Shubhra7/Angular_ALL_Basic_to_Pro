import { Routes } from "@angular/router";
import { Rooms } from "./rooms";
import { RoomsList } from "./rooms-list/rooms-list";
import { RoomsAdd } from "./rooms-add/rooms-add";
import { RoomsBooking } from "./rooms-booking/rooms-booking";
import { loginGuard } from "../guard/login-guard";
import { roomGuard } from "./guard/room-guard";


export const ROOMS_ROUTES: Routes = [
    {
        path:'',
        component: Rooms,
        canActivateChild: [roomGuard],   //For only role based allowed [ex: only admin can use this]
        children: [

            // Lazy Loading
            {
                path: 'list', 
                loadComponent: ()=> import('./rooms-list/rooms-list').then(m=> m.RoomsList)    
            },

            {path: 'addy', component: RoomsAdd, canActivate:[loginGuard]},
            {path: ':roomid', component: RoomsBooking, canActivate:[loginGuard]},
        ]
    }
]
import { Routes } from '@angular/router';
import { Employee } from './employee/employee';
import { Rooms } from './rooms/rooms';
import { Notfound } from './notfound/notfound';
import { RoomsBooking } from './rooms/rooms-booking/rooms-booking';
import { RoomsAdd } from './rooms/rooms-add/rooms-add';
import { Login } from './login/login';
import { ROOMS_ROUTES } from './rooms/rooms.routes';

export const routes: Routes = [
    { path: 'employee', component: Employee },
    // { path: 'rooms', component: Rooms},
    {path: 'rooms/add', component: RoomsAdd},
    // {path: 'rooms/:roomid', component: RoomsBooking},

    {path:'rooms', children: ROOMS_ROUTES},

    {path:'login', component: Login},
    {path:'',redirectTo:"/login", pathMatch: 'full'},
    {path: '**', component: Notfound} //wildcart route
];

import { Routes } from '@angular/router';
import { Employee } from './employee/employee';
import { Rooms } from './rooms/rooms';
import { Notfound } from './notfound/notfound';
import { RoomsBooking } from './rooms/rooms-booking/rooms-booking';
import { RoomsAdd } from './rooms/rooms-add/rooms-add';
import { Login } from './login/login';
import { ROOMS_ROUTES } from './rooms/rooms.routes';
import { Booking } from './booking/booking';
import { lazyLoadGauard, loginGuard } from './guard/login-guard';

export const routes: Routes = [
  { path: 'employee', component: Employee, canActivate: [loginGuard] },
  { path: 'rooms/add', component: RoomsAdd, canActivate: [loginGuard] },
  // {path: 'rooms/:roomid', component: RoomsBooking},


// type: 1 => Eager Load
//   { path: 'rooms', children: ROOMS_ROUTES },

// type: 2 => lazy Load
    {
        path:'rooms',
        loadChildren: ()=>{
            return import('./rooms/rooms.routes').then(m => m.ROOMS_ROUTES)
        },
        canActivate: [loginGuard],
        canMatch: [lazyLoadGauard]       //For lazy load guard
    },

  { path: 'login', component: Login },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'bookings', component: Booking, canActivate: [loginGuard]},
  { path: 'bookings', component: Booking},
  { path: '**', component: Notfound }, //wildcart route
];

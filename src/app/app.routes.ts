import { Routes } from '@angular/router';
import { Employee } from './employee/employee';
import { Rooms } from './rooms/rooms';
import { Notfound } from './notfound/notfound';

export const routes: Routes = [
    { path: 'employee', component: Employee },
    { path: 'rooms', component: Rooms},
    {path: '', redirectTo: '/rooms', pathMatch: 'full' },
    
];

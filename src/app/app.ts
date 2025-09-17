import { Component, ElementRef, Inject, signal, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Rooms } from './rooms/rooms';
import { Container } from './container/container';
import { NgStyle } from '@angular/common';
import { Employee } from './employee/employee';
import { localStorageToken } from './localstorage.token';
import { InitService } from './init';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Rooms, Container, NgStyle, Employee],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  styles: [`h1 {color:red;}`],
})
export class App {
  protected readonly title = signal('hotelinventoryapp');
  loginTypes = 'Admin';

  // dynamic load room component using @viewChild

  // @ViewChild('user', {read: ViewContainerRef}) vcr!: ViewContainerRef;

  // ngAfterViewInit(){
  //   const componentRef = this.vcr.createComponent(Rooms)
  //   componentRef.instance.numberOfRooms = 50;

  // }

  // Using @ViewChild() controlling dom element in own and writing something
  @ViewChild('name',{static:true}) name!: ElementRef

  constructor(@Inject(localStorageToken) private localStorage: any, private initService: InitService){
    console.log(initService.config);
  }

  ngOnInit(){
    this.name.nativeElement.innerText = "Debjit by @viewchild from app.ts"

    // adding value in localstorage through localStorageToken Service
    this.localStorage.setItem('name', 'Hilton Hotel')
  }


}

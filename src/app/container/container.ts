import { Component, ContentChild } from '@angular/core';
import { Employee } from '../employee/employee';

@Component({
  selector: 'app-container',
  imports: [],
  templateUrl: './container.html',
  styleUrl: './container.scss'
}) 
export class Container {

  // To access Projected Content use--> @ContentChild
  @ContentChild(Employee) employee! : Employee;

  ngAfterContentInit(){
    console.log('from container.ts so see projected component employee.ts');
    console.log(this.employee);
    this.employee.empName = 'Halu Rich'
  }

}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Emailvalidator } from '../emailvalidator/emailvalidator';
import { Hover } from '../hover';
import { Router } from '@angular/router';
import { LoginService } from './login-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, Hover, Emailvalidator],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  email: string='';
  password: string='';

  // taking Router Service provided by Angular for navgiate 
  constructor(private route : Router, private loginService : LoginService){}

  Login(){
    if(this.loginService.login(this.email,this.password)){
      this.route.navigate(['/rooms'])
      // this.route.navigateByUrl('/rooms')
    }
  }


}

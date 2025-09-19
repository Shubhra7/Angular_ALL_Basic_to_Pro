import { Inject, Injectable } from '@angular/core';
import { RouteConfigToken } from './routeConfig.service';
import { RouteConfig } from './routeConfig';

@Injectable({
  providedIn: 'any'
})
export class Config {
  constructor(@Inject(RouteConfigToken) private configToken : RouteConfig){
    console.log('ConfigService');
    console.log(this.configToken);
    
    
  }
}

import {
  ApplicationConfig,
  ErrorHandler,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_SERVICE_CONFIG } from './AppConfig/appconfig.service';
import { APP_CONFIG } from './AppConfig/appconfig.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { requestInterceptor } from './request-interceptor';
import {  InitService } from './init';
import { RouteConfigToken } from './services/routeConfig.service';
import { GlobalErrorHandler } from './errorhandler.service';

// APP INITILIAZER only recieve promise/observable/void
function initFactory(){
  const service = inject(InitService);  // inject service here
  return service.init();   // returns Promise | Observable | void
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: APP_SERVICE_CONFIG,
      useValue: APP_CONFIG,
    },
    {
      provide: RouteConfigToken,
      useValue: {title : 'Home'},
    },
    provideHttpClient(
      withInterceptors([requestInterceptor])
    ),
    provideAppInitializer(initFactory),// Angular waits for this Observable to complete

    // {provide: ErrorHandler, useClass: GlobalErrorHandler}  //For global error handler
  ],
};

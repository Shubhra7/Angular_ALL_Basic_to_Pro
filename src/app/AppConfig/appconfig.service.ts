import { InjectionToken } from "@angular/core";
import { AppConfig } from "./appconfig.interface";
import { environment } from "../../environments/environment.development";

// creating service
export const APP_SERVICE_CONFIG = new InjectionToken<AppConfig>('app.config');


// Providing vlaue
export const APP_CONFIG : AppConfig = {
    apiEndPoint: environment.apiUrl
}

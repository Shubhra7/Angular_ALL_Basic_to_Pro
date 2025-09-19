import { InjectionToken } from "@angular/core";
import { RouteConfig as RouteConfigInterface } from "./routeConfig";

export const RouteConfigToken = new InjectionToken<RouteConfigInterface>('routeConfig');


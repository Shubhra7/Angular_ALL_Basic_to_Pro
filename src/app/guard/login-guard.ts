import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router';
import { LoginService } from '../login/login-service';

// route → snapshot of the current route (params, data, query, etc.).
// state → snapshot of the router state (full URL, tree).

function checkAuth(router : Router): boolean | UrlTree {
  const loginService = inject(LoginService);
  return loginService.isLoggedIn ? true : router.parseUrl('/login');
}


// For routing guard
export const loginGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  return checkAuth(router);

};


// For loading lazyload component guard
export const lazyLoadGauard: CanMatchFn = () =>{

  const router = inject(Router);
  return checkAuth(router);

}

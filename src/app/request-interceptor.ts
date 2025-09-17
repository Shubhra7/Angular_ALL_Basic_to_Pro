import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Request Interceptor', req);
  const jwt = 'BUbai__JWT';

  //   setHeaders → merges new headers into existing headers (recommended for tokens).

  // headers: new HttpHeaders({...}) → completely replaces headers, losing all existing ones (usually not what you want).

  if (req.method === 'POST') {
    const postReq = req.clone({
      setHeaders: { Authorization: `BearerPost ${jwt}` },
    });
    return next(postReq);
  } else {
    const newRequest = req.clone({
      // headers: new HttpHeaders({ token: '1234asdasd6' }),  //replace the all existing header and put the only new one
      headers: req.headers.set('token', '1234asdasd6'), // keeps old ones, adds token
    });
    return next(newRequest);
  }
};

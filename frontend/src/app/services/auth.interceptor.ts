import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHandlerFn,
  HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandlerFn
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token'); 
    if (token) {
      const clonedRequest = request.clone({
        setHeaders: {
        Authorization: `Bearer ${token}`,
        },
      });

      return next.handle(clonedRequest);
    }
    return next.handle(request);
  }

  loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    return next(req).pipe(tap(event => {
      if (event.type === HttpEventType.ResponseHeader) {
        locin
        console.log(req.url, 'returned a response with status', event.status);
      }
    }));
}

export function 
}

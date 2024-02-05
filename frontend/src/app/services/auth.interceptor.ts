import {
  HttpEvent,
  HttpEventType,
  HttpInterceptorFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from "@angular/common/http";
import { inject } from "@angular/core"
import { Observable, tap } from "rxjs";
import { BrowserInteractionsService } from "./browser-interactions.service"

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const browserInteractionsService = inject(BrowserInteractionsService)
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        const responseBody: any = event.body;

        if (responseBody?.token) {
          const token = responseBody.token;
          browserInteractionsService.setLocalStorageItem('token', token)
        }
      }
    })
  );
};

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const browserInteractionsService = inject(BrowserInteractionsService)

  const token = browserInteractionsService.getLocalStorageItem('token')
  // clone the request and set the new header
  if (token) {
    const reqWithHeader = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${token}`),
    });
    // pass the request to the next handler or the backend
    return next(reqWithHeader);
  }
  return next(req)
};

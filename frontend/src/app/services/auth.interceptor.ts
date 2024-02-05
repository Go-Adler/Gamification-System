import {
  HttpEventType,
  HttpInterceptorFn,
} from "@angular/common/http";
import { inject } from "@angular/core"
import { tap } from "rxjs";
import { BrowserInteractionsService } from "./browser-interactions.service"
import { Router } from "@angular/router"

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const browserInteractionsService = inject(BrowserInteractionsService)
  const router = inject(Router)
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        const responseBody: any = event.body;

        if (responseBody?.token) {
          const token = responseBody.token;
          browserInteractionsService.setLocalStorageItem('token', token)
        }

        if (event.status === 401 || responseBody?.invalidToken) {
          browserInteractionsService.clearLocalStorageItem()
          router.navigateByUrl('/punch-in')
        }
      }
    }),
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

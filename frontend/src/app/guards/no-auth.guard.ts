import { afterRender, inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router';
import { BrowserInteractionsService } from '../services/browser-interactions.service'

export const noAuthGuard: CanActivateFn = (route, state) => {

  const browserInteractionsService = inject(BrowserInteractionsService)

  // get the token from local storage
  let token = browserInteractionsService.getLocalStorageItem('token')
    
    
    // if the token exists, return true
    if (token == null) {
      return true;
    }
  
    // otherwise, create a UrlTree to redirect to the login page
    else {
      // use inject() to get the Router service
      const router = inject(Router);
  
      // create a UrlTree with the login route and the return url as a query param
      const urlTree = router.createUrlTree(["/home"]);
  
      // return the UrlTree
      return urlTree;
    }
};
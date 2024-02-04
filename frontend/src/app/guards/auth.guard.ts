import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  // get the token from local storage
  const token = localStorage.getItem("token");

  // if the token exists, return true
  if (token != null) {
    return true;
  }

  // otherwise, create a UrlTree to redirect to the login page
  else {
    // use inject() to get the Router service
    const router = inject(Router);

    // create a UrlTree with the login route and the return url as a query param
    const urlTree = router.createUrlTree(["/punch-in"]);

    // return the UrlTree
    return urlTree;
  }
};

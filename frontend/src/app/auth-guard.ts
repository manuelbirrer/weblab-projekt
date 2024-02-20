import {AuthService} from "./services/auth.service";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  if (inject(AuthService).canActivate()) {
    return true;
  }
  inject(Router).navigate(["/login"], {queryParams: {returnUrl: state.url}});
  inject(AuthService).canActivate();
  return false;
}

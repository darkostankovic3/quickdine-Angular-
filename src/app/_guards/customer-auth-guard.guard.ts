import { CartService } from "app/_services/customer/cart.service";
import { SettingService } from "app/_services/customer/setting.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "./../_services/auth.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class CustomerAuthGuard implements CanActivate {
  uuid: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    public route: ActivatedRoute,
    public settingService: SettingService,
    public cartService: CartService
  ) {
    this.uuid = this.route.snapshot.params["uuid"];
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.cartService.otp == null) {
      if (this.settingService.settings === null) {
        this.router.navigate(["ordering/" + route.params["uuid"] + "/welcome"]);
        return false;
      }

      if (this.cartService.continueAsGuest == true) return true;

      if (this.settingService.getLoginScreenPlacement() == "On Checkout")
        return true;

      if (this.settingService.getLoginScreenPlacement() == "Beginning") {
        this.router.navigate(
          ["ordering/" + route.params["uuid"] + "/auth/login"],
          { queryParams: { returnUrl: state.url } }
        );
        return true;
      }

      const currentUser = this.authService.currentUserValue;
      if (currentUser) {
        return true;
      }

      // not logged in so redirect to login page with the return url
      // this.router.navigate(['ordering/' + route.params['uuid'] + '/auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    return true;
  }
}

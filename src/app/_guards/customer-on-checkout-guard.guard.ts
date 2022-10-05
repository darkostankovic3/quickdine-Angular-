import { CartService } from "app/_services/customer/cart.service";
import { SettingService } from "app/_services/customer/setting.service";
import { AuthService } from "app/_services/auth.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRoute,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CustomerOnCheckoutGuardGuard implements CanActivate {
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
      if (this.settingService.settings == null) {
        this.router.navigate(["ordering/" + route.params["uuid"] + "/welcome"]);
        return false;
      }

      if (this.cartService.continueAsGuest) return true;

      const currentUser = this.authService.currentUserValue;
      if (currentUser) {
        return true;
      }

      // not logged in so redirect to login page with the return url
      if (
        this.settingService.getLoginScreenPlacement() == "On Checkout" ||
        this.settingService.getLoginScreenPlacement() === "Beginning"
      )
        this.router.navigate(
          ["ordering/" + route.params["uuid"] + "/auth/login"],
          { queryParams: { returnUrl: state.url } }
        );

      return true;
    }

    if (this.cartService.otp !== null) {
      if (this.cartService.continueAsGuest) return true;

      const currentUser = this.authService.currentUserValue;
      if (currentUser) {
        return true;
      }

      if (this.settingService.getTableLogin() == "True")
        this.router.navigate(
          ["ordering/" + route.params["uuid"] + "/auth/login"],
          { queryParams: { returnUrl: state.url } }
        );
    }

    return true;
  }
}

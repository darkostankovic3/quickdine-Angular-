import { CartService } from "app/_services/customer/cart.service";
import { SettingService } from "./../../_services/customer/setting.service";
import { LocationModel } from "app/_models/location.model";
import { LocationService } from "app/_services/tenant/location.service";
import { MenuService } from "./../../_services/customer/menu.service";
import { ActivatedRoute, Router } from "@angular/router";
import { BrandMenuModel } from "app/_models/brand-menu.model";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"],
})
export class MainPageComponent implements OnInit {
  public brandMenus: BrandMenuModel[] = [];
  public uuid: string = null;
  public locationId: number;
  public location: LocationModel;

  constructor(
    public http: HttpClient,
    public route: ActivatedRoute,
    public menuService: MenuService,
    public locationService: LocationService,
    public settingService: SettingService,
    public router: Router,
    public cartService: CartService,
    public translate: TranslateService
  ) {
    this.uuid = this.route.snapshot.params["uuid"];
    this.locationId = this.route.snapshot.params["locationId"];
    // if (!localStorage.getItem('language'))
    //   translate.use(this.route.snapshot.params[localStorage.getItem('language')]);
  }

  ngOnInit() {}

  goToBrands() {
    this.cartService.backLinks.push(this.router.url);
    this.router.navigate([
      "/kiosk/uuid/" + this.uuid + "/location/" + this.locationId + "/brands",
    ]);
  }

  goToProducts() {
    this.cartService.backLinks.push(this.router.url);
    this.router.navigate([
      "/kiosk/uuid/" +
        this.uuid +
        "/location/" +
        this.locationId +
        "/catalogue",
    ]);
  }

  goToBestSellerProducts(data) {
    this.router.navigate(
      [
        "/kiosk/uuid/" +
          this.uuid +
          "/location/" +
          this.locationId +
          "/catalogue",
      ],
      {
        queryParams: {
          type: data,
        },
      }
    );
  }

  getHotPromoBackground() {
    return this.settingService.getHotPromoBackground();
  }

  getListTenantBackground() {
    return this.settingService.getListTenantBackground();
  }

  getFindFoodBackground() {
    return this.settingService.getFindFoodBackground();
  }

  getHotSellerBackground() {
    return this.settingService.getHotSelllerBackground();
  }

  getSecondImage() {
    return this.settingService.getSecondImage();
  }
}

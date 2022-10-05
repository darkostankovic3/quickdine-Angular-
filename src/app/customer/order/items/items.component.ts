import { environment } from './../../../../environments/environment';
import { SettingService } from "./../../../_services/customer/setting.service";
import { BrandMenuItemModel } from "./../../../_models/brand-menu-item.model";
import { BrandMenuModel } from "app/_models/brand-menu.model";
import { ActivatedRoute, Router } from "@angular/router";
import { MenuService } from "./../../../_services/customer/menu.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.scss"]
})
export class ItemsComponent implements OnInit {
  public uuid: string = null;
  public brandMenu: BrandMenuModel;
  public brandMenuId: string = null;
  public locationId: string = null;
  public nullImage: string;

  constructor(
    public menuService: MenuService,
    public route: ActivatedRoute,
    public settingService: SettingService,
    public router: Router
  ) {
    this.uuid = this.route.snapshot.params["uuid"];
    this.brandMenuId = this.route.snapshot.params["brandMenuId"];
    this.locationId = this.route.snapshot.params["locationId"];
    this.nullImage = environment.nullImage;

    this.menuService
      .getBrandMenu(
        this.uuid,
        this.route.snapshot.params["brandMenuId"],
        this.locationId
      )
      .subscribe(result => {
        this.brandMenu = result;
      });
  }

  ngOnInit() { }

  categoryClicked(brandMenuItem: BrandMenuItemModel) {
    this.router.navigate([
      "order/" +
      this.uuid +
      "/location/" +
      this.locationId +
      "/brand-menu/" +
      this.brandMenuId +
      "/menu/" +
      brandMenuItem.menu.id
    ]);
  }

  backClicked() {
    this.router.navigate([
      "order/" + this.uuid + "/location/" + this.locationId
    ]);
  }
}

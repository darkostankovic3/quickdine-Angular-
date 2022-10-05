import { CartService } from './../../../_services/customer/cart.service';
import { BrandMenuItemModel } from './../../../_models/brand-menu-item.model';
import { BrandMenuModel } from './../../../_models/brand-menu.model';
import { MenuService } from './../../../_services/customer/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-menu',
  templateUrl: './brand-menu.component.html',
  styleUrls: ['./brand-menu.component.scss']
})
export class BrandMenuComponent implements OnInit {
  public uuid: string;
  public brandMenuId: string;
  public locationId: string;
  public brandMenu: BrandMenuModel;
  public brandMenuItems: BrandMenuItemModel[];

  constructor(public route: ActivatedRoute,
    public menuService: MenuService,
    public router: Router,
    public cartService: CartService) {
    this.uuid = this.route.snapshot.params["uuid"];
    this.brandMenuId = this.route.snapshot.params["brandMenuId"];
    this.locationId = this.route.snapshot.params["locationId"];

    this.menuService
      .getBrandMenu(
        this.uuid,
        this.route.snapshot.params["brandMenuId"],
        this.locationId
      )
      .subscribe(result => {
        this.brandMenu = result;
        this.brandMenuItems = JSON.parse(JSON.stringify(result.brand_menu_items));

        this.menuService.brandMenuItemList = this.brandMenuItems;
      });
  }

  ngOnInit() {

  }

  menuClicked(brandMenuItem: BrandMenuItemModel) {
    this.router.navigate(['menu/' + brandMenuItem.menu.id], { relativeTo: this.route });
  }
}

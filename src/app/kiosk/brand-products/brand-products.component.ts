import { CartService } from 'app/_services/customer/cart.service';
import { SettingService } from 'app/_services/customer/setting.service';
import { MenuService } from './../../_services/customer/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandMenuModel } from 'app/_models/brand-menu.model';
import { MenuModel } from 'app/_models/menu.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-products',
  templateUrl: './brand-products.component.html',
  styleUrls: ['./brand-products.component.scss']
})
export class BrandProductsComponent implements OnInit {
  public uuid: string = null;
  public brandMenuId: number = null;
  public menuId: number = null;
  public menus: MenuModel[] = [];
  public locationId: number = null;
  public brandMenus: BrandMenuModel[];
  public parentName: string;

  constructor(public route: ActivatedRoute,
    public menuService: MenuService,
    public settingService: SettingService,
    public cartService: CartService,
    public router: Router) {
    this.uuid = this.route.snapshot.params['uuid'];
    this.brandMenuId = this.route.snapshot.params['brandMenuId'];
    this.menuId = 28;
    this.locationId = this.route.snapshot.params['locationId'];
    this.getProducts();
  }

  ngOnInit() {
  }

  getProducts(menuForm: any = null) {
    if (menuForm === null)
      menuForm = {};

    const form = {
      ...{
        uuid: this.uuid,
        brand_menu_id: this.brandMenuId
      }, ...menuForm
    };

    this.menuService
      .getMenuWithoutBrandId(this.uuid, this.locationId, form)
      .subscribe(result => {
        this.brandMenus = [JSON.parse(JSON.stringify(result))]; console.log(this.brandMenus);
        // this.parentName = this.brandMenus[0].brand_menu_items[0].menu.name;
        this.parentName = 'Brands';
      });
  }

  productClicked(record: any) {
    this.router.navigate(['/kiosk/uuid/' + this.uuid + '/location/' + this.locationId + '/brands/' + this.brandMenuId + '/catalogue/' + this.menuId + '/product/' + record.id]);
  }
}

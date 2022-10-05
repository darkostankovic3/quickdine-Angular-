import { CartService } from 'app/_services/customer/cart.service';
import { SettingService } from 'app/_services/customer/setting.service';
import { BrandMenuModel } from 'app/_models/brand-menu.model';
import { MenuService } from './../../_services/customer/menu.service';
import { MenuModel } from 'app/_models/menu.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
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
    this.menuId = this.route.snapshot.params['menuId'];
    this.locationId = this.route.snapshot.params['locationId'];
    this.getProducts();
  }

  ngOnInit() {
  }

  getProducts() {
    this.menuService
      .getMenuForId(this.uuid, this.brandMenuId, this.menuId, this.locationId)
      .subscribe(result => {
        this.brandMenus = [JSON.parse(JSON.stringify(result))];
        this.parentName = this.brandMenus[0].brand_menu_items[0].menu.name;
      });
  }

  productClicked(record: any) {
    this.router.navigate(['/kiosk/uuid/' + this.uuid + '/location/' + this.locationId + '/brands/' + this.brandMenuId + '/catalogue/' + this.menuId + '/product/' + record.id]);
  }
}

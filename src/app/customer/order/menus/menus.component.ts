import { environment } from './../../../../environments/environment';
import { ShowComboComponent } from './../_modals/show-combo/show-combo.component';
import { ShowUpsellComponent } from './../_modals/show-upsell/show-upsell.component';
import { AddOnModel } from './../../../_models/add-on.model';
import { BrandMenuModel } from './../../../_models/brand-menu.model';
import { CartService } from './../../../_services/customer/cart.service';
import { MenuModel } from 'app/_models/menu.model';
import { MenuService } from './../../../_services/customer/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SettingService } from 'app/_services/customer/setting.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddonComponent } from '../_modals/addon/addon.component';
import { CombosComponent } from '../_modals/combos/combos.component';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {
  public uuid: string = null;
  public brandMenuId: number = null;
  public menuId: number = null;
  public menus: MenuModel[];
  public locationId: number = null;
  public brandMenu: BrandMenuModel;
  public addOns: AddOnModel[];
  public nullImage: string;

  constructor(
    public route: ActivatedRoute,
    private toastr: ToastrService,
    public router: Router,
    public menuService: MenuService,
    public cartService: CartService,
    public settingService: SettingService,
    public modalService: NgbModal
  ) {
    this.uuid = this.route.snapshot.params['uuid'];
    this.brandMenuId = this.route.snapshot.params['brandMenuId'];
    this.menuId = this.route.snapshot.params['menuId'];
    this.locationId = this.route.snapshot.params['locationId'];
    this.nullImage = environment.nullImage;

    this.menuService
      .getMenuForId(this.uuid, this.brandMenuId, this.menuId, this.locationId)
      .subscribe(result => {
        this.brandMenu = result;
        this.menus = result.brand_menu_items[0].menu.menus;
      });
  }

  ngOnInit() { }

  backClicked() {
    this.router.navigate([
      'order/' +
      this.uuid +
      '/location/' +
      this.locationId +
      '/brand-menu/' +
      this.brandMenuId
    ]);
  }

  getQuantity(menu: MenuModel) {
    const _menu = this.cartService.cartMenus.find(item => item.id === menu.id);

    if (_menu) {
      return _menu.quantity;
    }

    return 0;
  }

  openAddOn() {
    this.modalService.open(AddonComponent, {
      backdropClass: 'light-blue-backdrop'
    });
  }


  addToCart(record: MenuModel) {
    this.productSelected(record);
  }

  productSelected(record: MenuModel) {
    // if (record.is_comborecord.portions.length === 1) {
    //   this.cartService.addToCart({ ...record }, { ...record.portions[0] }, [
    //     ...[]
    //   ]);
    // } else {
    let _record = JSON.parse(JSON.stringify(record));
    const modalRef = this.modalService.open(AddonComponent, {
      size: 'lg',
      windowClass: 'xt-modal-class'
    }).componentInstance;
    modalRef.portions = [..._record.product.product_portions];
    modalRef.menu = _record;
    modalRef.locationId = this.locationId;
    modalRef.uuid = this.uuid;
  }
  // }
}

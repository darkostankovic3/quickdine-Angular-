import { MenuService } from './../../../../_services/customer/menu.service';
import { Router } from '@angular/router';
import { CartService } from 'app/_services/customer/cart.service';
import { TagModel } from 'app/_models/tag.model';
import { ProductModel } from 'app/_models/product.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingService } from './../../../../_services/customer/setting.service';
import { MenuModel } from './../../../../_models/menu.model';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public selectedPortion: any;
  public selectedMenu: MenuModel = null;
  public tags: TagModel[];
  public upsellSelected: boolean = false;
  @ViewChild('content', { static: true }) content: any;

  public _menu: MenuModel;
  @Input("menu")
  set menu(value: MenuModel) {
    this._menu = value;
    if (this.menu.product.product_portions.length === 1) {
      this.selectedPortion = this.menu.product.product_portions[0];
    }
  }
  get menu() {
    return this._menu;
  }

  public _productId: number;
  @Input("productId")
  set productId(value: number) {
    this._productId = value;
  }
  get productId() {
    return this._productId;
  }

  public _menuId: number;
  @Input("menuId")
  set menuId(value: number) {
    this._menuId = value;
  }
  get menuId() {
    return this._menuId;
  }

  public _uuid: string;
  @Input("uuid")
  set uuid(value: string) {
    this._uuid = value;
  }
  get uuid() {
    return this._uuid;
  }

  public _locationId: number;
  @Input("locationId")
  set locationId(value: number) {
    this._locationId = value;
  }
  get locationId() {
    return this._locationId;
  }

  public _brandMenuId: number;
  @Input("brandMenuId")
  set brandMenuId(value: number) {
    this._brandMenuId = value;
  }
  get brandMenuId() {
    return this._brandMenuId;
  }

  constructor(public settingService: SettingService,
    public modal: NgbActiveModal,
    public modalService: NgbModal,
    public cartService: CartService,
    public router: Router,
    public menuService: MenuService) {
  }

  ngOnInit() {
    this.menuService
      .getMenuByProductId(this.uuid, this.brandMenuId, this.menuId, this.locationId, this.productId)
      .subscribe(
        result => {
          this.menu = result.brand_menu_items[0].menu.menus[0];
          // this.product = result.brand_menu_items[0].menu.menus.filter(item => item.id == this.productId)[0];

          // this.parentName = result.brand_menu_items[0].menu.menus[0].name;
          // this.portions = JSON.parse(JSON.stringify(this.product.product.product_portions));

          // if (this.portions && this.portions.length === 1)
          //   this.selectedPortion = this.portions[0];
          // else if (this.portions && this.portions.length > 1)
          //   this.selectedPortion = this.portions[0];
        });
  }

  decreaseQuantity() {
    if (this.selectedMenu)
      this.selectedMenu.selected_quantity--;

    this.menu.selected_quantity--;
  }

  increaseQuantity() {
    if (this.selectedMenu)
      this.selectedMenu.selected_quantity++;

    this.menu.selected_quantity++;
  }

  validateProductTag(event, product: ProductModel) {
    product.tag_valid = event;
  }

  tagsAdded(tags: TagModel[]) {
    this.tags = [...tags];
  }

  upsellProductSelected(upsell: any) {
    const menu = JSON.parse(JSON.stringify(this.menu));
    menu.product = { ...upsell.product_up_sell_product };
    upsell.product_up_sell_product.price_with_details = { ...upsell.price_with_details };
    this.upsellSelected = true;
    this.selectedMenu.upsell_items.push({ ...upsell.product_up_sell_product });
  }

  validate() {
    if (this.selectedPortion === undefined) {
      return false;
    }

    if (this.menu.product.tag_valid === false)
      return false;

    if (this.menu.product.combo_valid === false)
      return false;

    if (this.upsellSelected
      && this.selectedMenu.upsell_items
      && this.selectedMenu.upsell_items.length > 0
      && this.selectedMenu.upsell_items.filter(item => item.tag_valid === false).length > 0) {
      return false;
    }

    let valid = true;

    if (this.upsellSelected
      && this.selectedMenu.upsell_items
      && this.selectedMenu.upsell_items.length > 0
      && this.selectedMenu.upsell_items.filter(item => item.is_combo === true)) {
      for (const upsellProduct of this.selectedMenu.upsell_items) {
        for (const productCombo of upsellProduct.product_combos) {
          if (productCombo.valid === true && valid === true)
            valid = true;
          else
            valid = false;
        }
      }
    }

    return valid;
  }

  addOrder() {
    if (!this.selectedMenu)
      this.selectedMenu = { ...this.menu };

    this.selectedMenu.product.selected_tags = new Array();
    this.selectedMenu.product.selected_tags = [...this.tags];

    if (this.upsellSelected === false)
      this.selectedMenu.upsell_items = new Array();

    if (this.menu.product && this.menu.product.product_up_sells && this.menu.product.product_up_sells.length > 0 && this.upsellSelected === false) {
      const upsellModalRef = this.modalService.open(this.content, {
        size: 'sm'
      }).componentInstance;
    } else {
      this.addToCart();
    }
  }

  addToCart() {
    this.cartService.rubberState = !this.cartService.rubberState;
    this.cartService.addToCart({ ...this.selectedMenu }, { ...this.selectedPortion });
    this.modal.close();
  }

  comboValid(event) {
    this.menu.product.combo_valid = event;
  }

  tagsAddedForUpsell(event, product: ProductModel) {
    product.selected_tags = [...event];
  }

  upsellCanceled() {
    this.modal.close();
  }

  cancelUpsell() {
    this.addToCart();
  }
}

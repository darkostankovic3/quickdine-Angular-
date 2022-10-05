import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'app/_services/customer/cart.service';
import { TagModel } from 'app/_models/tag.model';
import { ProductModel } from 'app/_models/product.model';
import { SettingService } from 'app/_services/customer/setting.service';
import { BrandMenuModel } from 'app/_models/brand-menu.model';
import { MenuService } from './../../_services/customer/menu.service';
import { MenuModel } from 'app/_models/menu.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  public upsellSelected: boolean = false;
  public selectedMenu: MenuModel = null;
  public tags: TagModel[];
  public uuid: string = null;
  public brandMenuId: number = null;
  public menuId: number = null;
  public locationId: number = null;
  public productId: number = null;
  public product: MenuModel;
  public brandMenu: BrandMenuModel;
  public portions: any[] = [];
  public selectedPortion: any;
  public parentName: string = null;

  @ViewChild('content', { static: true }) content: any;

  constructor(public route: ActivatedRoute,
    public router: Router,
    public menuService: MenuService,
    public settingService: SettingService,
    public cartService: CartService,
    private modalService: NgbModal
  ) {
    this.uuid = this.route.snapshot.params['uuid'];
    this.brandMenuId = this.route.snapshot.params['brandMenuId'];
    this.menuId = this.route.snapshot.params['menuId'];
    this.locationId = this.route.snapshot.params['locationId'];
    this.productId = this.route.snapshot.params['productId'];

    this.menuService
      .getMenuByProductId(this.uuid, this.brandMenuId, this.menuId, this.locationId, this.productId)
      .subscribe(result => {
        this.brandMenu = result;
        this.product = result.brand_menu_items[0].menu.menus.filter(item => item.id == this.productId)[0];

        this.parentName = result.brand_menu_items[0].menu.menus[0].name;
        this.portions = JSON.parse(JSON.stringify(this.product.product.product_portions));

        if (this.portions && this.portions.length === 1)
          this.selectedPortion = this.portions[0];
        else if (this.portions && this.portions.length > 1)
          this.selectedPortion = this.portions[0];
      });
  }

  ngOnInit() {

  }

  increaseQuantity() {
    if (this.selectedMenu)
      this.selectedMenu.selected_quantity++;

    this.product.selected_quantity++;
  }

  decreaseQuantity() {
    if (this.selectedMenu)
      this.selectedMenu.selected_quantity--;

    this.product.selected_quantity--;
  }

  addOrder() {
    if (!this.selectedMenu)
      this.selectedMenu = { ...this.product };

    this.selectedMenu.product.selected_tags = new Array();
    this.selectedMenu.product.selected_tags = [...this.tags];

    if (this.upsellSelected === false)
      this.selectedMenu.upsell_items = new Array();

    if (this.product.product && this.product.product.product_up_sells && this.product.product.product_up_sells.length > 0 && this.upsellSelected === false) {
      const upsellModalRef = this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', windowClass: 'xt-modal-class' }).componentInstance;
    } else {
      this.addToCart();
    }
  }

  validate() {
    if (this.selectedPortion === undefined) {
      return false;
    }

    if (this.product.product.tag_valid === false)
      return false;

    if (this.product.product.combo_valid === false)
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

  validateProductTag(event, product: ProductModel) {
    product.tag_valid = event;
  }

  tagsAdded(tags: TagModel[]) {
    this.tags = [...tags];
  }

  upsellProductSelected(upsell: any) {
    const menu = JSON.parse(JSON.stringify(this.product));
    menu.product = { ...upsell.product_up_sell_product };
    upsell.product_up_sell_product.price_with_details = { ...upsell.price_with_details };
    this.upsellSelected = true;
    this.selectedMenu.upsell_items.push({ ...upsell.product_up_sell_product });
  }

  cancelUpsell() {
    this.addToCart();
  }

  addToCart() {
    this.cartService.addToCart({ ...this.selectedMenu }, { ...this.selectedPortion });
    if (this.cartService.backLinks.length > 0)
      this.router.navigate([this.cartService.backLinks.pop()]);
    else
      this.router.navigate(['/kiosk/uuid/' + this.uuid + '/location/' + this.locationId + '/catalogue/brands/' + this.brandMenuId])
  }

  comboValid(event) {
    this.product.product.combo_valid = event;
  }

  tagsAddedForUpsell(event, product: ProductModel) {
    product.selected_tags = [...event];
  }
}

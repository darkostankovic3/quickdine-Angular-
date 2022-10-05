import { ProductModel } from './../../../../_models/product.model';
import { environment } from './../../../../../environments/environment.prod';
import { ShowUpsellComponent } from './../show-upsell/show-upsell.component';
import { TagModel } from 'app/_models/tag.model';
import { HttpClient } from '@angular/common/http';
import { AddOnModel } from "./../../../../_models/add-on.model";
import { CartService } from "./../../../../_services/customer/cart.service";
import { MenuModel } from "./../../../../_models/menu.model";
import { SettingService } from "./../../../../_services/customer/setting.service";
import { BrandLocationProductModel } from "./../../../../_models/brand-location-product.model";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit, Input } from "@angular/core";
import { trigger, state, style, animate, transition } from "@angular/animations";
import { TranslateService } from "@ngx-translate/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-addon",
  templateUrl: "./addon.component.html",
  styleUrls: ["./addon.component.scss"],
  animations: [
    trigger("buttonTextStateTrigger", [
      state(
        "shown",
        style({
          opacity: 1
        })
      ),
      state(
        "transitioning",
        style({
          opacity: 0.3
        })
      ),
      transition("shown => transitioning", animate("600ms ease-out")),
      transition("transitioning => shown", animate("600ms ease-in"))
    ])
  ]
})
export class AddonComponent implements OnInit {
  public debug: boolean;
  public tagsValid = true;
  public tags: TagModel[] = [];
  public upsellSelected: boolean = false;

  // The current state of the button text
  buttonTextState = "shown";
  // The text currently being show
  buttonText = "ADD";
  // The text that will be shown when the transition is finished
  transitionButtonText = "ADD";

  public _portions: BrandLocationProductModel[];
  @Input("portions")
  set portions(value: BrandLocationProductModel[]) {
    this._portions = value;
  }
  get portions() {
    return this._portions;
  }

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

  public selectedPortion: any;
  public addOnsAdded: AddOnModel[] = new Array();
  public selectedMenu: MenuModel = null;

  constructor(
    public http: HttpClient,
    public modal: NgbActiveModal,
    public settingService: SettingService,
    public translate: TranslateService,
    public cartService: CartService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal) {
    this.debug = environment.production;
  }

  ngOnInit() { }

  addClicked() {
    // this.onAddToCart();
    if (!this.selectedMenu)
      this.selectedMenu = { ...this.menu };

    this.selectedMenu.product.selected_tags = new Array();
    this.selectedMenu.product.selected_tags = [...this.tags];

    if (this.upsellSelected === false)
      this.selectedMenu.upsell_items = new Array();

    if (this.menu.product && this.menu.product.product_up_sells && this.menu.product.product_up_sells.length > 0 && this.upsellSelected === false) {
      const upsellModalRef = this.modalService.open(ShowUpsellComponent, {
        size: 'lg',
        windowClass: 'xt-modal-class'
      }).componentInstance;

      upsellModalRef.menu = this.menu;

      upsellModalRef.cancel.subscribe(
        result => {
          this.cartService.addToCart(this.selectedMenu, { ...this.selectedPortion });
          this.activeModal.close();
        }
      );

      upsellModalRef.productSelected.subscribe(
        result => {
          this.upsellSelected = true;
          this.selectedMenu.upsell_items.push({ ...result });
        }
      );
    } else {
      this.cartService.addToCart({ ...this.selectedMenu }, { ...this.selectedPortion });
      this.activeModal.close();
    }
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

  onAddToCart() {
    this.buttonTextState = "transitioning";
    this.transitionButtonText = "ADDING...";

    setTimeout(() => {
      this.buttonTextState = "transitioning";
      this.transitionButtonText = "ADDED";
    }, 1800);

    setTimeout(() => {
      this.buttonTextState = "transitioning";
      this.transitionButtonText = "ADD";
      this.activeModal.close();
    }, 3600);
  }

  buttonTextTransitioned(event) {
    this.buttonText = this.transitionButtonText;
    this.buttonTextState = this.buttonTextState = "shown";
  }

  validateProductTag(event, product: ProductModel) {
    product.tag_valid = event;
  }

  tagsAdded(tags: TagModel[]) {
    this.tags = [...tags];
  }

  tagsAddedForUpsell(event, product: ProductModel) {
    product.selected_tags = [...event];
  }

  comboValid(event) {
    this.menu.product.combo_valid = event;
  }

  increaseQuantity() {
    if (this.selectedMenu)
      this.selectedMenu.selected_quantity++;

    this.menu.selected_quantity++;
  }

  decreaseQuantity() {
    if (this.selectedMenu)
      this.selectedMenu.selected_quantity--;

    this.menu.selected_quantity--;
  }
}

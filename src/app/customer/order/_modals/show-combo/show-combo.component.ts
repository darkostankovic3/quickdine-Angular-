import { CartService } from 'app/_services/customer/cart.service';
import { ProductComboItemModel } from 'app/_models/product-combo-item.model';
import { TagModel } from 'app/_models/tag.model';
import { ProductComboModel } from './../../../../_models/product-combo.model';
import { ProductModel } from 'app/_models/product.model';
import { AddOnTypeModel } from 'app/_models/add-on-type.model';
import { AddOnModel } from './../../../../_models/add-on.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingService } from 'app/_services/customer/setting.service';
import { MenuModel } from 'app/_models/menu.model';
import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";

@Component({
  selector: 'app-show-combo',
  templateUrl: './show-combo.component.html',
  styleUrls: ['./show-combo.component.scss'],
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

export class ShowComboComponent implements OnInit {
  public addOnsAdded: AddOnModel[] = new Array();

  public _product: ProductModel;
  @Input("product")
  set product(value: ProductModel) {
    this._product = { ...value };
  }
  get product() {
    return this._product;
  }

  public _menu: MenuModel;
  @Input("menu")
  set menu(value: MenuModel) {
    this._menu = { ...value };
    this.product = this.menu.product;
  }
  get menu() {
    return this._menu;
  }

  public _addOns: AddOnModel[];
  @Input("addOns")
  set addOns(value: AddOnModel[]) {
    this._addOns = value;
  }
  get addOns() {
    return this._addOns;
  }

  // The current state of the button text
  buttonTextState = "shown";
  // The text currently being show
  buttonText = "ADD";
  // The text that will be shown when the transition is finished
  transitionButtonText = "ADD";

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

  constructor(public settingService: SettingService,
    public modal: NgbActiveModal,
    public cartService: CartService) { }

  ngOnInit() {
  }

  buttonTextTransitioned(event) {
    this.buttonText = this.transitionButtonText;
    this.buttonTextState = this.buttonTextState = "shown";
  }

  addOnsSelected(event: AddOnTypeModel[], addOn: AddOnModel) {
    const _addOn = { ...addOn };
    for (const addOnType of event) {
      _addOn.add_on_types = [...event];
    }

    const index = this.addOnsAdded.findIndex(item => item.id === _addOn.id);
    if (index !== -1) this.addOnsAdded.splice(index, 1);

    if (event.length > 0) this.addOnsAdded.push(_addOn);
  }

  addClicked() {
    this.onAddToCart();

    let menu = { ...this.menu };
    menu.product = { ...this.product };

    console.log(menu);
    // this.cartService.addToCart(menu, { ...this.selectedPortion }, [
    //   ...this.addOnsAdded
    // ]);

    this.modal.close();
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
    }, 3600);
  }

  validate() {
    let valid = true;
    for (const productCombo of this.product.product_combos) {
      if (valid === true && productCombo.selected !== null)
        valid = true;
      else
        valid = false;
    }

    if (valid === true) {
      for (const productCombo of this.product.product_combos) {
        if (productCombo.tag_valid === false && valid === true)
          valid = false;
      }
    }

    return valid;
  }

  validateComboGroup(_valid: boolean, productCombo: ProductComboModel) {
    productCombo.tag_valid = _valid;

    let valid = true;
    for (const productCombo of this.product.product_combos) {
      if (valid === true && productCombo.selected !== null)
        valid = true;
      else
        valid = false;
    }

    if (valid === true) {
      for (const productCombo of this.product.product_combos) {
        if (productCombo.tag_valid === false && valid === true)
          valid = false;
      }
    }

    return valid;
  }

  tagsAdded(tags: TagModel[], productComboItem: ProductComboItemModel) {
    if (this.menu.product.is_combo === true) {
      productComboItem.tags = new Array();
      productComboItem.tags = [...tags];
    }
  }
}

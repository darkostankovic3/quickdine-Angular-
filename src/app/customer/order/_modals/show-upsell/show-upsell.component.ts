import { ProductUpSellModel } from './../../../../_models/product-up-sell.model';
import { AddOnModel } from './../../../../_models/add-on.model';
import { SettingService } from 'app/_services/customer/setting.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuModel } from 'app/_models/menu.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";

@Component({
  selector: 'app-show-upsell',
  templateUrl: './show-upsell.component.html',
  styleUrls: ['./show-upsell.component.scss'],
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
export class ShowUpsellComponent implements OnInit {
  // The current state of the button text
  buttonTextState = "shown";
  // The text currently being show
  buttonText = "ADD";
  // The text that will be shown when the transition is finished
  transitionButtonText = "ADD";
  public _menu: MenuModel;
  @Input("menu")
  set menu(value: MenuModel) {
    this._menu = value;
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

  @Output() productSelected = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  constructor(public modal: NgbActiveModal,
    public settingService: SettingService) { }

  ngOnInit() {
  }

  cancelPressed() {
    this.modal.close();
    this.cancel.emit();
  }

  upsellProductSelected(upsell: any) {
    const menu = JSON.parse(JSON.stringify(this.menu)); console.log(menu);
    menu.product = { ...upsell.product_up_sell_product };
    upsell.product_up_sell_product.price_with_details = { ...upsell.price_with_details };

    this.productSelected.emit(upsell.product_up_sell_product);
    this.modal.close();
  }

  buttonTextTransitioned(event) {
    this.buttonText = this.transitionButtonText;
    this.buttonTextState = this.buttonTextState = "shown";
  }
}

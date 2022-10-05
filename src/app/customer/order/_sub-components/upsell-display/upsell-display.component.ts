import { SettingService } from './../../../../_services/customer/setting.service';
import { ProductModel } from './../../../../_models/product.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-upsell-display',
  templateUrl: './upsell-display.component.html',
  styleUrls: ['./upsell-display.component.scss']
})
export class UpsellDisplayComponent implements OnInit {
  public _upsells: ProductModel[];
  @Input("upsells")
  set tags(value: ProductModel[]) {
    this._upsells = value;
  }
  get upsells() {
    return this._upsells;
  }

  private _quantity;
  @Input("quantity")
  set quantity(value: number) {
    this._quantity = value;
  }
  get quantity() {
    return this._quantity;
  }

  constructor(public settingService: SettingService) { }

  ngOnInit() {
  }

}

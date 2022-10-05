import { SettingService } from './../../../../_services/customer/setting.service';
import { ProductComboModel } from './../../../../_models/product-combo.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-combo-display',
  templateUrl: './product-combo-display.component.html',
  styleUrls: ['./product-combo-display.component.scss']
})
export class ProductComboDisplayComponent implements OnInit {
  public _productCombos: ProductComboModel[];
  @Input("productCombos")
  set tproductCombosags(value: ProductComboModel[]) {
    let combos = new Array();
    for (const _value of value) {
      if (_value.product_combo_items.filter(item => item.auto_select === true).length > 0)
        combos.push(_value);
    }
    this._productCombos = [...combos];
  }
  get productCombos() {
    return this._productCombos;
  }

  constructor(public settingService: SettingService) { }

  ngOnInit() {
  }

}

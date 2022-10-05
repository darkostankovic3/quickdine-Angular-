import { CartDisplayComponent } from './../../_modals/cart-display/cart-display.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingService } from 'app/_services/customer/setting.service';
import { ProductComboModel } from './../../../_models/product-combo.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-combo-display',
  templateUrl: './combo-display.component.html',
  styleUrls: ['./combo-display.component.scss']
})
export class ComboDisplayComponent implements OnInit {
  public _productCombos: ProductComboModel[];
  @Input("productCombos")
  set productCombos(value: ProductComboModel[]) {
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

  constructor(public settingService: SettingService,
    public modalService: NgbModal) { }

  ngOnInit() {
  }

  openTagModal(tags: any) {
    const modalRef = this.modalService
      .open(CartDisplayComponent, {
        size: 'lg',
        windowClass: 'xt-modal-class'
      }).componentInstance;

    modalRef.tags = tags;
  }
}

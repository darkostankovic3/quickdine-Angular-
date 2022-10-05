import { ProductComboItemModel } from 'app/_models/product-combo-item.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingService } from 'app/_services/customer/setting.service';
import { ProductModel } from 'app/_models/product.model';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-combo-details',
  templateUrl: './combo-details.component.html',
  styleUrls: ['./combo-details.component.scss']
})
export class ComboDetailsComponent implements OnInit {
  public comboInComboValidCheck: boolean = true;
  public _product: ProductModel;
  @ViewChild('content', { static: true }) content: any;

  private _locationId: number;
  @Input("locationId")
  set locationId(value: number) {
    this._locationId = value;
  }
  get locationId() {
    return this._locationId;
  }

  @Input("product")
  set product(value: ProductModel) {
    this._product = { ...value }; console.log(this._product);
  }
  get product() {
    return this._product;
  }
  @Output() valid = new EventEmitter<any>();

  constructor(public settingService: SettingService,
    public modalService: NgbModal) {

  }

  ngOnInit() {
    this.validate();
  }

  validate() {
    for (const productCombo of this.product.product_combos) {
      let valid = true;
      let max = productCombo.maximum;
      let min = productCombo.minimum;
      let selected = 0;

      if (productCombo.product_combo_items.filter(item => item.auto_select === true).length > 0) {
        for (const productComboItem of productCombo.product_combo_items) {
          if (productComboItem.auto_select === true)
            selected += productComboItem.selected_quantity;

          if (productComboItem.auto_select === true && productComboItem.product.tag_valid === false && valid === true)
            valid = false;

          if (valid === true && productComboItem.auto_select === true && productComboItem.product.is_combo === true) {
            valid = this.validateComboInCombo(productComboItem);
          }
        }

        if (min == 0) {
          if (selected <= max && valid === true) {
            valid = true;
          } else {
            valid = false;
          }
        } else {
          if (selected >= min && selected <= max && valid === true) {
            valid = true;
          } else {
            valid = false;
          }
        }
        productCombo.valid = valid;
      } else {
        if (min == 0 && selected == 0) {
          productCombo.valid = true;
        } else {
          productCombo.valid = false;
        }
      }
    }

    if (this.product.product_combos.length > 0 && this.product.product_combos.filter(item => item.valid === false).length > 0) {
      this.valid.emit(false);
    } else {
      this.valid.emit(true);
    }
  }

  validateComboInCombo(productComboItem) {
    if (productComboItem.product.is_combo === true) {
      for (const productCombo of productComboItem.product.product_combos) {
        let valid = true;
        let max = productCombo.maximum;
        let min = productCombo.minimum;
        let selected = 0;

        if (productCombo.product_combo_items.filter(item => item.auto_select === true).length > 0) {
          for (const productComboItem of productCombo.product_combo_items) {
            if (productComboItem.auto_select === true)
              selected += productComboItem.selected_quantity;

            if (productComboItem.auto_select === true && productComboItem.product.tag_valid === false && valid === true)
              valid = false;
          }

          if (selected >= min && selected <= max && valid === true) {
            valid = true;
          } else {
            valid = false;
          }

          productCombo.valid = valid;
          return valid;
        } else {
          productCombo.valid = false;
          return false;
        }
      }
    }
  }

  addClicked(productComboItem: ProductComboItemModel) {
    productComboItem.selected_quantity++;
    this.validate();
  }

  removeClicked(productComboItem: ProductComboItemModel) {
    productComboItem.product.reload_tags = false;
    productComboItem.selected_quantity--;

    if (productComboItem.selected_quantity === 0)
      productComboItem.auto_select = false;

    setTimeout(() => {
      productComboItem.product.reload_tags = true;
    }, 100);
  }

  validateProduct(event, product: ProductModel) {
    product.tag_valid = event;
    this.validate();
  }

  tagsAdded(event, product: ProductModel) {
    product.selected_tags = [...event];
    this.validate();
  }

  comboInComboValid(event, product: ProductModel) {
    // console.log(event);
    // console.log(product);
    // product.combo_valid = event;
    // this.comboInComboValidCheck = event;
  }

  openModel(content: any) {
    this.modalService.open(content, {
      size: 'sm'
    });
  }
}

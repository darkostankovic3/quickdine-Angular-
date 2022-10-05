import { ProductModel } from './../../../_models/product.model';
import { TagItemModel } from './../../../_models/tag-item.model';
import { SettingService } from './../../../_services/customer/setting.service';
import { TagModel } from './../../../_models/tag.model';
import { MenuModel } from './../../../_models/menu.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-tag',
  templateUrl: './product-tag.component.html',
  styleUrls: ['./product-tag.component.scss']
})
export class ProductTagComponent implements OnInit {
  public tags: TagModel[] = new Array();
  @Output() validate = new EventEmitter<boolean>();
  @Output() tagsAdded = new EventEmitter<TagModel[]>();
  public isMandatory: boolean = false;

  private _locationId: number;
  @Input("locationId")
  set locationId(value: number) {
    this._locationId = value;
  }
  get locationId() {
    return this._locationId;
  }

  public _menu: MenuModel;
  @Input("menu")
  set menu(value: MenuModel) {
    this._menu = value;
    this._product = this.menu.product;
    this.http.post('tag/custom/product', {
      product_id: this.menu.product.id,
      location_id: this.locationId
    })
      .map(
        (response: any) => {
          return <TagModel[]>response;
        }
      )
      .subscribe(
        result => {
          this.tags = result;
          this.validateData();
        }
      );
  }
  get menu() {
    return this._menu;
  }


  public _quantity: number = 1;
  @Input("quantity")
  set quantity(value: number) {
    if (this._quantity && this._quantity !== value) {
      this._quantity = value;
      this.validateData();
    } else {
      this._quantity = value;
    }
  }
  get quantity() {
    return this._quantity;
  }

  public _product: ProductModel;
  @Input("product")
  set product(value: ProductModel) {
    this._product = value;
    this.http.post('tag/custom/product', {
      product_id: value.id,
      location_id: this.locationId
    })
      .map(
        (response: any) => {
          return <TagModel[]>response;
        }
      )
      .subscribe(
        result => {
          this.tags = result;
          for (const tag of this.tags) {
            if (tag.min_select > 0) {
              this.isMandatory = true;
              break;
            }
          }
          this.validateData();
        }
      );
  }
  get product() {
    return this._product;
  }

  constructor(public http: HttpClient,
    public settingService: SettingService) { }

  ngOnInit() {

  }

  removeClicked(tagItem: TagItemModel) {
    if (tagItem.selected_quantity > 0)
      tagItem.selected_quantity--;

    if (tagItem.selected_quantity === 0)
      tagItem.is_selected = false;

    this.validateData();
  }

  addClicked(tagItem: TagItemModel) {
    tagItem.selected_quantity++;
    this.validateData();
  }

  validateTagitem() {

  }

  validateData() {
    let valid = false;

    for (const tag of this.tags) {
      const max = tag.max_select;
      const min = tag.min_select;
      let selected = 0;

      if (max !== 0 && min !== 0) {
        for (const tagItem of tag.tag_items) {
          if (tagItem.is_selected === true)
            selected = selected + tagItem.selected_quantity;
        }

        if (selected >= min && selected <= max) {
          tag.validate = true;
        } else {
          tag.validate = false;
        }
      } else {
        tag.validate = true;
      }
    }

    if (this.tags.filter(item => item.validate === false).length > 0)
      valid = false;
    else
      valid = true;

    if (valid)
      this.tagsAdded.emit([...this.tags.filter(item => item.validate === true)]);

    this.validate.emit(valid);
  }

  minusAllowed() {
    return true;
  }
}

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SettingService } from 'app/_services/customer/setting.service';
import { CartService } from 'app/_services/customer/cart.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Output() productSelected = new EventEmitter<any>();

  public _brandLogo: any;
  @Input("brandLogo")
  set brandLogo(value: string) {
    this._brandLogo = value;
  }
  get brandLogo() {
    return this._brandLogo;
  }

  public _brandMenu: any;
  @Input("brandMenu")
  set brandMenu(value: any) {
    this._brandMenu = value;
  }
  get brandMenu() {
    return this._brandMenu;
  }

  public _record: any;
  @Input("record")
  set record(value: any) {
    this._record = value;
  }
  get record() {
    return this._record;
  }

  public _uuid: any;
  @Input("uuid")
  set uuid(value: any) {
    this._uuid = value;
  }
  get uuid() {
    return this._uuid;
  }

  public _showCategory: boolean = true;
  @Input("showCategory")
  set showCategory(value: boolean) {
    this._showCategory = value;
  }
  get showCategory() {
    return this._showCategory;
  }

  public _locationId: any;
  @Input("locationId")
  set locationId(value: any) {
    this._locationId = value;
  }
  get locationId() {
    return this._locationId;
  }

  constructor(public cartService: CartService,
    public settingService: SettingService,
    public router: Router) { }

  ngOnInit() {
  }

  productClicked() {
    this.cartService.backLinks.push(this.router.url);
    this.productSelected.emit({});
    this.router.navigate(['/kiosk/uuid/' + this.uuid + '/location/' + this.locationId + '/brands/' + this.record.brand_menu_items[0].brand_menu_id + '/catalogue/' + this.record.parent_id + '/product/' + this.record.id]);
  }
}

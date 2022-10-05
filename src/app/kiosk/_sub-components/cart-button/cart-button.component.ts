import { SettingService } from 'app/_services/customer/setting.service';
import { Router } from '@angular/router';
import { CartService } from './../../../_services/customer/cart.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.scss']
})
export class CartButtonComponent implements OnInit {
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

  constructor(public cartService: CartService,
    public settingService: SettingService,
    public router: Router) { }

  ngOnInit() {
  }

  goToCart() {
    this.cartService.backLinks.push(this.router.url);
    this.router.navigate(['/kiosk/uuid/' + this.uuid + '/location/' + this.locationId + '/cart']);
  }
}

import { CartDisplayComponent } from './../_modals/cart-display/cart-display.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingService } from './../../_services/customer/setting.service';
import { CartService } from 'app/_services/customer/cart.service';
import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public uuid: string = null;
  public locationId: number;

  constructor(
    public cartService: CartService,
    public settingService: SettingService,
    public route: ActivatedRoute,
    public translate: TranslateService,
    public router: Router,
    public modalService: NgbModal,
    public deviceDetectorService: DeviceDetectorService
  ) {
    this.uuid = this.route.snapshot.params['uuid'];
    this.locationId = this.route.snapshot.params['locationId'];

  }

  ngOnInit() {

  }

  redirectToPayment() {
    if(!this.deviceDetectorService.isMobile()){
      this.router.navigate([
        '/kiosk/uuid/' + this.uuid + '/location/' + this.locationId + '/thank-you'
      ]);
    }else{
      this.placeOrder();
    }
  }

  placeOrder() {
    this.cartService.placeOrderV2(this.locationId).subscribe(result => {
      this.router.navigate([
        '/kiosk/uuid/' +
        this.uuid +
        '/location/' +
        this.locationId +
        '/ticket/' +
        result.id +
        '/order-completed'
      ]);
    });
  }

  openComboModal(menu: any) { }
}

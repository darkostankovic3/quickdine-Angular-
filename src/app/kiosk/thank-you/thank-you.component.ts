import { SettingService } from 'app/_services/customer/setting.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'app/_services/customer/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
  public uuid: string = null;
  public locationId: number;

  constructor(
    public cartService: CartService,
    public route: ActivatedRoute,
    public router: Router,
    public settingService: SettingService) {
    this.uuid = this.route.snapshot.params['uuid'];
    this.locationId = this.route.snapshot.params['locationId'];
  }

  ngOnInit() { }

  placeOrder() {
    this.cartService.placeOrderV2(this.locationId, null).subscribe(result => {
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
}

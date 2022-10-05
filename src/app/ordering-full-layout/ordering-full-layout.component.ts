import { ActivatedRoute } from '@angular/router';
import { CommonOrderService } from './../_services/customer/common-order.service';
import { CartService } from 'app/_services/customer/cart.service';
import { SettingService } from 'app/_services/customer/setting.service';
import { LanguageService } from 'app/_services/language.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordering-full-layout',
  templateUrl: './ordering-full-layout.component.html',
  styleUrls: ['./ordering-full-layout.component.scss']
})
export class OrderingFullLayoutComponent implements OnInit {
  public direction: string = "ltr";

  constructor(
    public languageService: LanguageService,
    public settingService: SettingService,
    public cartService: CartService,
    public commonOrderService: CommonOrderService,
    public route: ActivatedRoute) {
  }

  ngOnInit() { }
}

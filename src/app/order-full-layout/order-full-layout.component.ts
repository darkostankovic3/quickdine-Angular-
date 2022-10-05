import { CommonOrderService } from './../_services/customer/common-order.service';
import { CartService } from 'app/_services/customer/cart.service';
import { LanguageService } from "./../_services/language.service";
import { Component, OnInit } from "@angular/core";
import { SettingService } from "app/_services/customer/setting.service";

@Component({
  selector: "app-order-full-layout",
  templateUrl: "./order-full-layout.component.html",
  styleUrls: ["./order-full-layout.component.scss"]
})
export class OrderFullLayoutComponent implements OnInit {
  public direction: string = "ltr";

  constructor(
    public languageService: LanguageService,
    public settingService: SettingService,
    public cartService: CartService,
    public commonOrderService: CommonOrderService) { }

  ngOnInit() { }
}

import { SettingService } from "app/_services/customer/setting.service";
import { CartService } from "./../../../_services/customer/cart.service";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-order-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {
  @Output() next = new EventEmitter<any>();

  constructor(
    public cartService: CartService,
    public settingService: SettingService,
    public translate: TranslateService
  ) {}

  ngOnInit() {}
}

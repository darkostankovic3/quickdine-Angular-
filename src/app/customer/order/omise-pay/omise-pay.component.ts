import { SettingService } from "./../../../_services/customer/setting.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { CartService } from "app/_services/customer/cart.service";
import { TicketModel } from "app/_models/ticket.model";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-omise-pay",
  templateUrl: "./omise-pay.component.html",
  styleUrls: ["./omise-pay.component.scss"]
})
export class OmisePayComponent implements OnInit {
  public form: FormGroup;
  public uuid: string = null;
  public locationId: number = null;
  public loading: boolean;
  public months: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  public years: any = [2019, 2020, 2021, 2022, 2023];

  constructor(
    public fb: FormBuilder,
    public http: HttpClient,
    public cartService: CartService,
    public translate: TranslateService,
    public route: ActivatedRoute,
    public router: Router,
    public settingService: SettingService
  ) {
    this.uuid = this.route.snapshot.params["uuid"];
    this.locationId = this.route.snapshot.params["locationId"];
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ["Testing T.", [Validators.required]],
      number: ["4242424242424242", [Validators.required]],
      expiration_month: [12, [Validators.required]],
      expiration_year: [2020, [Validators.required]],
      security_code: [123, [Validators.required]],
      money: [this.cartService.getTotal(), []]
    });
  }

  onSubmit() {
    this.loading = true;

    this.cartService.placeOrder(this.form.value, this.uuid, this.locationId)
      .subscribe(
        result => {
          this.router.navigate([
            "order/" + this.uuid + "/order-placed/ticket/" + result.id
          ]);
        },
        error => {
          this.loading = false;
        }
      );
  }

  homeClicked() {
    this.router.navigate([
      "order/" + this.uuid + "/location/" + this.locationId
    ]);
  }
}

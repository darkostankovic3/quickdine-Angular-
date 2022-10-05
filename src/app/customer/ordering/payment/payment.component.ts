import { SettingService } from "app/_services/customer/setting.service";
import { CartService } from "app/_services/customer/cart.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { environment } from "environments/environment";
import { PaymentMethodService } from "app/_services/tenant/payment-method.service";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
})
export class PaymentComponent implements OnInit {
  public months: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public years: any = [
    2020,
    2021,
    2022,
    2023,
    2024,
    2025,
    2026,
    2027,
    2028,
    2029,
    2030,
  ];
  public uuid: string;
  public locationId: number;
  public form: FormGroup;
  public loading: boolean;
  public paymentMethod: string;

  constructor(
    public route: ActivatedRoute,
    public fb: FormBuilder,
    public cartService: CartService,
    public settingService: SettingService,
    public paymentMethodService: PaymentMethodService,
    public router: Router
  ) {
    this.uuid = this.route.snapshot.params["uuid"];
    this.locationId = this.route.snapshot.params["locationId"];
    this.paymentMethod = this.route.snapshot.params["paymentMethod"];

    this.getCardCharges();
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      number: [null, [Validators.required]],
      expiration_month: [null, [Validators.required]],
      expiration_year: [null, [Validators.required]],
      security_code: [null, [Validators.required]],
      money: [this.cartService.getTotal(), []],
      type: [this.paymentMethod],
    });
  }

  onSubmit() {
    this.loading = true;

    this.cartService
      .placeOrder(this.form.value, this.uuid, this.locationId)
      .map((response: any) => {
        return <any>response;
      })
      .subscribe(
        (result) => {
          this.loading = false;

          if (this.paymentMethod == "Omise") {
            window.location.href = result.authorize_uri;
          }

          // if (this.paymentMethod !== 'Paytm') {

          //   this.router.navigate([
          //     "ordering/" + this.uuid + "/successful/ticket/" + result.id
          //   ]);
          // } else {

          // }
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  getCardCharges() {
    this.paymentMethodService
      .getCardCharges(this.paymentMethod, this.cartService.getTotal())
      .subscribe(
        (result) => {
          console.log(result);
        },
        (error) => {}
      );
  }
}

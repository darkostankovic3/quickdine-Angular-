import { SettingService } from "../../../_services/customer/setting.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { CartService } from "app/_services/customer/cart.service";
import { TicketModel } from "app/_models/ticket.model";
import { TranslateService } from "@ngx-translate/core";
import { ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare var My2c2p: any;

@Component({
  selector: "app-card-pay",
  templateUrl: "./card-pay.component.html",
  styleUrls: ["./card-pay.component.scss"]
})

export class CardPayComponent implements OnInit {
  public form: FormGroup;
  public uuid: string = null;
  public paymentMethod: string = null;
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
    public settingService: SettingService,
    private toastr: ToastrService
  ) {
    this.uuid = this.route.snapshot.params["uuid"];
    this.locationId = this.route.snapshot.params["locationId"];
    this.paymentMethod = this.route.snapshot.params["paymentMethod"];
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ["Testing T.", [Validators.required]],
      number: ["4242424242424242", [Validators.required]],
      type: [this.paymentMethod, []],
      expiration_month: [12, [Validators.required]],
      expiration_year: [2020, [Validators.required]],
      security_code: [123, [Validators.required]],
      money: [this.cartService.getTotal(), []],
      encryptedCardInfo: [null],
      barCodeNo: [''],
    });
  }

  onSubmit() {
    this.loading = true;

    if (this.paymentMethod === 'Ipay88') {
        this.placeOrder();
    }  else if (this.paymentMethod !== 'Omise') {
      this.getEncryptionKey();
    } else {
      this.placeOrder();
    }
  }
  
  placeOrder() {
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

  getEncryptionKey() {
    let _this = this;
    My2c2p.getEncrypted("2c2p-payment-form", function (encryptedData, errCode, errDesc) {
      if (errCode != 0) {
        _this.toastr.error('Can not create payment', 'Error');
        _this.loading = false;
        return false;
      }
      else {
        _this.form.patchValue({
          encryptedCardInfo: encryptedData.encryptedCardInfo
        });
        _this.placeOrder();
      }
    });
  }
}

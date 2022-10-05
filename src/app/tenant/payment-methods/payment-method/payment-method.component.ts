import { FormSnippet } from "./../../../_snippets/form.snipppet";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { PaymentMethodModel } from "app/_models/payment-method.model";
import { PaymentMethodService } from "app/_services/tenant/payment-method.service";

@Component({
  selector: "app-payment-method",
  templateUrl: "./payment-method.component.html",
  styleUrls: ["./payment-method.component.scss"],
})
export class PaymentMethodComponent implements OnInit {
  public pageLoader: boolean;
  public form: FormGroup;
  public loading: boolean = false;
  public recordId: number = null;
  public _paymentMethod: PaymentMethodModel;
  set paymentMethod(value: PaymentMethodModel) {
    this._paymentMethod = value;
    this.populate();
  }
  get paymentMethod() {
    return this._paymentMethod;
  }

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    public paymentMethodService: PaymentMethodService
  ) {
    //Get ID from url
    if (this.router.url.indexOf("edit") != -1) {
      this.recordId = this.route.snapshot.params["id"];
      this.pageLoader = true;
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      payment_method: [null, [Validators.required]],
      label: [null, [Validators.required]],
      is_active: [false],
      use_payment_keys: [false, []],
      keys: this.fb.array([]),
      card_charges: [null],
    });

    if (this.recordId) {
      let method = new FormControl("PUT", [Validators.required]);
      this.form.addControl("_method", method);

      this.paymentMethodService.get(this.recordId).subscribe((result) => {
        this.paymentMethod = result;
      });
    }
  }

  onUpdate() {
    this.loading = true;

    this.paymentMethodService.update(this.form.value, this.recordId).subscribe(
      (result) => {
        this.router.navigate(["tenant/payment-methods"]);
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  populate() {
    for (const item of Object.getOwnPropertyNames(new PaymentMethodModel())) {
      if (item !== "keys")
        FormSnippet.populateValueInForm(
          this.form,
          item,
          this.paymentMethod[item]
        );
    }
    this.addKeys();
    this.pageLoader = false;
  }

  getOmiseValue(key: string) {
    if (this.paymentMethod && this.paymentMethod.keys)
      if (this.paymentMethod.keys.findIndex((item) => item.key === key) !== -1)
        return this.paymentMethod.keys.find((item) => item.key === key).value;

    return null;
  }

  getPaytmValue(key: string) {
    if (this.paymentMethod && this.paymentMethod.keys)
      if (this.paymentMethod.keys.findIndex((item) => item.key === key) !== -1)
        return this.paymentMethod.keys.find((item) => item.key === key).value;

    return null;
  }

  getCcAvenueValue(key: string) {
    if (this.paymentMethod && this.paymentMethod.keys)
      if (this.paymentMethod.keys.findIndex((item) => item.key === key) !== -1)
        return this.paymentMethod.keys.find((item) => item.key === key).value;

    return null;
  }

  addKeys() {
    const keys = this.form.get("keys") as FormArray;

    if (this.paymentMethod.payment_method === "Omise") {
      for (const key of [
        "OMISE_PUBLIC_KEY",
        "OMISE_SECRET_KEY",
        "OMISE_API_VERSION",
      ]) {
        keys.push(
          this.fb.group({
            key: [key, [Validators.required]],
            value: [this.getOmiseValue(key)],
          })
        );
      }
    }

    if (this.paymentMethod.payment_method === "Stripe") {
      for (const key of ["STRIPE_PUBLIC_KEY", "STRIPE_PRIVATE_KEY"]) {
        keys.push(
          this.fb.group({
            key: [key, [Validators.required]],
            value: [this.getOmiseValue(key)],
          })
        );
      }
    }

    if (this.paymentMethod.payment_method === "2C2P") {
      for (const key of [
        "2C2P_MERCHANT_ID",
        "2C2P_SECRET_KEY",
        "2C2P_CURRENCY_CODE",
        "2C2P_SECURE_PAY_URL",
        "2C2P_API_VERSION",
      ]) {
        keys.push(
          this.fb.group({
            key: [key, [Validators.required]],
            value: [this.getOmiseValue(key)],
          })
        );
      }
    }

    if (this.paymentMethod.payment_method === "Ipay88") {
      for (const key of [
        "IPAY88_MERCHANT_KEY",
        "IPAY88_MERCHANT_CODE",
        "IPAY88_PAYMENT_URL",
        "IPAY88_CURRENCY_CODE",
      ]) {
        keys.push(
          this.fb.group({
            key: [key, [Validators.required]],
            value: [this.getOmiseValue(key)],
          })
        );
      }
    }

    if (this.paymentMethod.payment_method === "Paytm") {
      for (const key of [
        "PAYTM_ENVIRONMENT",
        "PAYTM_MERCHANT_ID",
        "PAYTM_MERCHANT_KEY",
        "PAYTM_MERCHANT_WEBSITE",
        "PAYTM_CHANNEL",
        "PAYTM_INDUSTRY_TYPE",
      ]) {
        keys.push(
          this.fb.group({
            key: [key, [Validators.required]],
            value: [this.getPaytmValue(key)],
          })
        );
      }
    }

    if (this.paymentMethod.payment_method === "CcAvenue") {
      for (const key of [
        "CCAVENUE_MERCHANT_ID",
        "CCAVENUE_ACCESS_CODE",
        "CCAVENUE_WORKING_KEY",
        "CCAVENUE_CURRENCY",
        "TEST_MODE",
      ]) {
        keys.push(
          this.fb.group({
            key: [key, [Validators.required]],
            value: [this.getPaytmValue(key)],
          })
        );
      }
    }
  }
}

import { ToastrService } from "ngx-toastr";
import { SettingService } from "app/_services/customer/setting.service";
import { TranslateService } from "@ngx-translate/core";
import { CartService } from "app/_services/customer/cart.service";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { CountryService } from "app/_services/customer/country.service";

@Component({
  selector: "app-table-otp",
  templateUrl: "./table-otp.component.html",
  styleUrls: ["./table-otp.component.scss"],
})
export class TableOtpComponent implements OnInit {
  public form: FormGroup;
  public tableId: number;
  public uuid: string;
  public locationId: number;
  public isOtpRequired: boolean = false;
  public isTwilioEnabled: boolean = false;
  public isTableBooked: boolean = null;
  public disabledField: boolean = false;
  public otpForm: FormGroup;
  public countryList: any = null;
  public seletedCode = null;

  constructor(
    public fb: FormBuilder,
    public route: ActivatedRoute,
    public http: HttpClient,
    public router: Router,
    public cartService: CartService,
    public translate: TranslateService,
    public settingService: SettingService,
    private toastr: ToastrService,
    public countryService: CountryService
  ) {
    this.uuid = this.route.snapshot.params["uuid"];
    this.tableId = this.route.snapshot.params["tableId"];
    this.locationId = this.route.snapshot.params["locationId"];
    this.cartService.tableId = this.tableId;

    this.http
      .get("customer/get/location/custom/table/" + this.tableId)
      .subscribe((result) => {
        this.isOtpRequired = (<any>result).is_otp_required;
        this.isTwilioEnabled = (<any>result).is_twilio_required;

        if (!this.isTwilioEnabled) {
          this.form.patchValue({
            is_sent: true,
          });
        }
      });

    this.http
      .get("customer/get/booking-table/custom/get/status/" + this.tableId)
      .subscribe((result) => {
        if ((<any>result).status === "Booked") this.isTableBooked = true;
        else this.isTableBooked = false;
      });

    this.getCountry();
  }

  ngOnInit() {
    this.otpForm = this.fb.group({
      otp: [null, [Validators.required]],
      booking_table_id: [this.tableId, [Validators.required]],
    });

    this.form = this.fb.group({
      otp: [null, [Validators.required]],
      booking_table_id: [this.tableId, [Validators.required]],
      phone_number: [null, []],
      is_sent: [false],
      country_code: [null],
      skip: [false],
    });

    this.getWebsiteCallingCode();
  }

  onSubmit(form: FormGroup, skip = true) {
    if (skip) {
      this.form.patchValue({
        skip: true,
      });
    }

    this.http.post("booking-table/custom/check/otp", form.value).subscribe(
      (result) => {
        const _result = <any>result;

        //Ticket logic
        {
          if (_result.tickets && _result.tickets.length > 0) {
            let orders = [];

            for (const ticket of _result.tickets) {
              for (const _order of ticket.orders) {
                _order.order_obj.can_delete = false;
                orders.push(_order.order_obj);
              }
            }

            this.cartService.cartMenus = JSON.parse(JSON.stringify(orders));
            if (
              _result.table.user_id !== "null" &&
              _result.table.user_id !== null
            )
              localStorage.setItem("user_id", _result.table.user_id);
            this.cartService.recalculate();
          }
        }

        //OTP
        {
          localStorage.setItem("tableId", "" + this.tableId);
          localStorage.setItem(
            "otp",
            JSON.stringify({ otp: _result.table.otp })
          );

          this.cartService.otp = _result.table.otp;
        }

        this.router.navigate([
          "/ordering/" + this.uuid + "/locations/" + this.locationId,
        ]);
      },
      (error) => {}
    );
  }

  generateOtp(id: number) {
    this.disabledField = true;

    this.toastr.show("Please check your phone while we generate code.", "");

    return this.http
      .post("booking-table/custom/get/otp", {
        booking_table_id: this.tableId,
        phone_number: this.form.value.phone_number,
        calling_code: this.form.value.country_code,
        location_id: this.locationId,
      })
      .map((response: any) => {
        return <any>response.otp;
      })
      .subscribe(
        (result) => {
          this.form.patchValue({
            is_sent: true,
          });
        },
        (error) => {
          this.disabledField = false;
        }
      );
  }

  skip() {
    this.onSubmit(this.form, true);
    // this.getTableOtpAndSkip();
    // this.router.navigate([
    //   "/ordering/" + this.uuid + "/locations/" + this.locationId,
    // ]);
  }

  getCountry() {
    this.countryService.getCountriesList().subscribe(
      (result) => {
        this.countryList = result;
      },
      (error) => {}
    );
  }

  getWebsiteCallingCode() {
    this.http
      .get("website/" + this.uuid + "/calling-code")
      .map((response: any) => {
        return <any>response;
      })
      .subscribe((result) => {
        this.seletedCode = result.calling_code;
      });
  }

  getTableOtpAndSkip() {
    this.http
      .get("customer/get/booking-table/custom/get/otp/" + this.tableId)
      .map((response: any) => {
        return <any>response;
      })
      .subscribe((result) => {
        console.log(result);
        // this.router.navigate([
        //   "/ordering/" + this.uuid + "/locations/" + this.locationId,
        // ]);
      });
  }
}

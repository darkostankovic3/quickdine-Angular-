import { SettingService } from "app/_services/customer/setting.service";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { CartService } from "app/_services/customer/cart.service";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-enter-otp",
  templateUrl: "./enter-otp.component.html",
  styleUrls: ["./enter-otp.component.scss"]
})
export class EnterOtpComponent implements OnInit {
  public form: FormGroup;
  public tableId: number;
  public uuid: string;
  public locationId: number;
  public isOtpRequired: boolean = false;
  public isTwilioEnabled: boolean = false;
  public isTableBooked: boolean = null;
  public disabledField: boolean = false;
  public otpForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public route: ActivatedRoute,
    public http: HttpClient,
    public router: Router,
    public cartService: CartService,
    public translate: TranslateService,
    public settingService: SettingService,
    private toastr: ToastrService
  ) {

    this.uuid = this.route.snapshot.params["uuid"];
    this.tableId = this.route.snapshot.params["tableId"];
    this.locationId = this.route.snapshot.params["locationId"];
    this.cartService.tableId = this.tableId;

    this.http.get('customer/get/location/custom/table/' + this.tableId)
      .subscribe(
        result => {
          this.isOtpRequired = (<any>result).is_otp_required;
          this.isTwilioEnabled = (<any>result).is_twilio_required;
        }
      );

    this.http.get('customer/get/booking-table/custom/get/status/' + this.tableId)
      .subscribe(
        result => {
          if ((<any>result).status === 'Booked')
            this.isTableBooked = true;
          else
            this.isTableBooked = false;
        }
      );
  }

  ngOnInit() {
    this.otpForm = this.fb.group({
      otp: [null, [Validators.required]],
      booking_table_id: [this.tableId, [Validators.required]]
    });

    this.form = this.fb.group({
      otp: [null, [Validators.required]],
      booking_table_id: [this.tableId, [Validators.required]],
      phone_number: [null, []],
      is_sent: [false]
    });
  }

  onSubmit(form: FormGroup) {
    this.http.post("booking-table/custom/check/otp", form.value).subscribe(
      result => {
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
            if (_result.table.user_id !== "null" && _result.table.user_id !== null)
              localStorage.setItem('user_id', _result.table.user_id);
            this.cartService.recalculate();
          }

        }

        //OTP
        {
          localStorage.setItem(
            "tableId", "" + this.tableId);
          localStorage.setItem(
            "otp",
            JSON.stringify({ otp: (<any>result).otp })
          );

          this.cartService.otp = (<any>result).otp;
        }


        this.router.navigate([
          "/order/" + this.uuid + "/location/" + this.locationId
        ]);
      },
      error => {

      }
    );
  }

  generateOtp(id: number) {
    this.disabledField = true;

    this.toastr.show('Please check your phone while we generate code.', '');

    return this.http
      .post("booking-table/custom/get/otp", {
        booking_table_id: this.tableId,
        phone_number: this.form.value.phone_number
      })
      .map((response: any) => {
        return <any>response.otp;
      })
      .subscribe(
        result => {
          this.form.patchValue({
            is_sent: true
          });

        },
        error => {
          this.disabledField = false;
        }
      );
  }

  skip() {
    this.router.navigate([
      "/order/" + this.uuid + "/location/" + this.locationId
    ]);
  }
}

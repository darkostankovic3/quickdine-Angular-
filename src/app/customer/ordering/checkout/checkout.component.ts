import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TicketModel } from "app/_models/ticket.model";
import { CommonOrderService } from "./../../../_services/customer/common-order.service";
import { PaymentMethodModel } from "app/_models/payment-method.model";
import { LocationModel } from "app/_models/location.model";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { SettingService } from "app/_services/customer/setting.service";
import { CartService } from "app/_services/customer/cart.service";
import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs/observable/forkJoin";
import { SelectItem } from "primeng/components/common/selectitem";
import { ClearOrderComponent } from "../_modals/clear-order/clear-order.component";
import { environment } from "environments/environment";
import { DepartmentModel } from "app/_models/department.model";
import { PaymentMethodService } from "app/_services/tenant/payment-method.service";
import { CountryService } from "app/_services/customer/country.service";
import { AuthService } from "app/_services/auth.service";
declare var OmiseCard;

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
  public uuid: string;
  public locationId: number;
  public location: LocationModel;
  types: SelectItem[] = new Array();
  public selectedType: string = null;
  public loading: boolean = false;
  public deliveryCharge: any = null;
  // public departmentObj: DepartmentModel;
  // public departmentCharge: number = null;
  // public departmentChargeType: string = null;
  public cardCharges: number = 0;
  user_id: number = null;

  constructor(
    public cartService: CartService,
    public settingService: SettingService,
    public router: Router,
    public route: ActivatedRoute,
    public http: HttpClient,
    public commonOrderService: CommonOrderService,
    public modalService: NgbModal,
    public paymentMethodService: PaymentMethodService,
    public countryService: CountryService,
    public authService: AuthService
  ) {
    this.uuid = this.route.snapshot.params["uuid"];
    this.locationId = this.route.snapshot.params["locationId"];

    forkJoin([
      this.http
        .get("customer/get/location/" + this.locationId)
        .map((response: any) => {
          return <LocationModel>response;
        }),
      this.http
        .get("customer/payment-methods/get/location/" + this.locationId)
        .map((response: any) => {
          return <PaymentMethodModel[]>response;
        }),
    ]).subscribe((result) => {
      this.location = result["0"];

      if (result["1"]) {
        for (const paymentMethod of result["1"]) {
          if (
            this.location.payment_methods !== null &&
            this.location.payment_methods.filter(
              (item) => item == paymentMethod.label
            )
          ) {
            if (paymentMethod.payment_method === "Cash") {
              this.types.push({
                label: paymentMethod.label,
                value: paymentMethod.payment_method,
                icon: "pi pi-money-bill",
              });
            } else {
              this.types.push({
                label: paymentMethod.label,
                value: paymentMethod.payment_method,
                icon: "fa fa-fw fa-cc-visa",
              });
            }
          }
        }
      }
    });
  }

  ngOnInit() {
    this.cartService.recalculate(this.locationId);
  }

  makePayment() {
    this.router.navigate([
      "ordering/" +
        this.uuid +
        "/locations/" +
        this.locationId +
        "/payment/" +
        this.selectedType,
    ]);
  }

  placeOrder(cardToken: any = null) {
    this.loading = true;

    if (this.selectedType === "Cash" || this.selectedType === null) {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      if (user) {
        this.user_id = user.id;
      }
      // let user_id = null;

      // if (user && user != undefined)
      //   user_id = user.id;

      this.http
        .post("customer/ticket", {
          location_id: this.locationId,
          menus: this.cartService.cartMenus,
          payment_method: this.selectedType,
          order_preference: this.commonOrderService.orderPreference,
          table_id: localStorage.getItem("tableId"),
          // user_id: localStorage.getItem("user_id"),
          user_id: this.user_id,
          taxes: this.cartService.taxes,
          otp: this.cartService.otp,
          delivery_charge: this.cartService.deliveryCharge,
          department_charge: {
            amount_type: this.cartService.departmentChargeType,
            amount: this.cartService.departmentCharge,
            caption: this.cartService.departmentCaption,
            taxes: this.cartService.departmentTaxes,
          },
          user_address_id: this.cartService.userAddress,
          remarks: this.cartService.remarks,
          card_charges: this.cardCharges,
        })
        .map((response: any) => {
          return <TicketModel>response;
        })
        .subscribe(
          (result) => {
            this.cartService.cartMenus = [...[]];
            this.cartService.taxes = new Array();
            localStorage.removeItem("user_id");
            return this.router.navigate([
              "ordering/" + this.uuid + "/successful/ticket/" + result.id,
            ]);
          },
          (error) => {
            this.loading = false;
          }
        );
    } else if (
      this.selectedType === "Paytm" ||
      this.selectedType === "CcAvenue"
    ) {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      if (user) {
        this.user_id = user.id;
      }
      // const user_id = user.id;
      this.http
        .post("customer/ticket", {
          location_id: this.locationId,
          menus: this.cartService.cartMenus,
          payment_method: this.selectedType,
          order_preference: this.commonOrderService.orderPreference,
          table_id: localStorage.getItem("tableId"),
          // user_id: localStorage.getItem("user_id"),
          user_id: this.user_id,
          taxes: this.cartService.taxes,
          otp: this.cartService.otp,
          delivery_charge: this.cartService.deliveryCharge,
          department_charge: {
            amount_type: this.cartService.departmentChargeType,
            amount: this.cartService.departmentCharge,
            caption: this.cartService.departmentCaption,
            taxes: this.cartService.departmentTaxes,
          },
          user_address_id: this.cartService.userAddress,
          card_charges: this.cardCharges,
          remarks: this.cartService.remarks,
        })
        .map((response: any) => {
          return <TicketModel>response;
        })
        .subscribe(
          (result) => {
            if (this.authService.currentUserValue) {
              this.user_id = this.authService.currentUserValue.id;
            }

            if (this.selectedType === "Paytm") {
              window.location.href =
                environment.url +
                "paytm/" +
                this.uuid +
                "/ticket/" +
                result.id +
                "/user/" +
                this.user_id;
            } else if (this.selectedType === "CcAvenue") {
              window.location.href =
                environment.url +
                "ccavenue/" +
                this.uuid +
                "/ticket/" +
                result.id;
            }
          },
          (error) => {
            this.loading = false;
          }
        );
    } else if (this.selectedType === "Omise") {
      OmiseCard.configure({
        publicKey: this.settingService.getOmisePublicKey(),
      });

      OmiseCard.open({
        amount:
          (this.cartService.getTotal() +
            this.cartService.deliveryCharge +
            this.cartService.departmentCharge +
            this.cardCharges) *
          100,
        currency: this.settingService.getCurrency(),
        defaultPaymentMethod: "credit_card",
        onCreateTokenSuccess: (nonce) => {
          this.cartService
            .placeOrder(
              {
                omise_token: nonce,
                type: "Omise",
              },
              this.uuid,
              this.locationId
            )
            .map((response: any) => {
              return <any>response;
            })
            .subscribe(
              (result) => {
                window.location.href = result.authorize_uri;
              },
              (error) => {
                this.loading = false;
              }
            );
        },
      });
    } else {
      this.makePayment();
    }
  }

  addMore() {
    this.router.navigate([
      "ordering/" + this.uuid + "/locations/" + this.locationId,
    ]);
  }

  cancelClicked() {
    const modal = this.modalService.open(ClearOrderComponent, { size: "sm" })
      .componentInstance;
    modal.caption = "Are you sure to clear the cart?";
    modal.action.subscribe((result) => {
      if (result === true) {
        this.cartService.taxes = new Array();
        this.cartService.cartMenus = new Array();
        this.homeClicked();
      }
    });
  }

  homeClicked() {
    this.router.navigate([
      "ordering/" + this.uuid + "/locations/" + this.locationId,
    ]);
  }

  // getDepartmentCharge() {
  //   this.http.post('get/department/details', {
  //     location_id: this.locationId,
  //     department: this.cartService.departmentName
  //   })
  //     .map(
  //       (response: any) => {
  //         return <DepartmentModel>response;
  //       }
  //     )
  //     .subscribe(
  //       result => {
  //         this.departmentObj = result
  //         this.departmentCharge = this.departmentObj.amount;
  //         this.departmentChargeType = this.departmentObj.amount_type;
  //       }
  //     )
  // }

  getCardCharges() {
    //Unset selected type if click again
    if (
      this.cartService.selectedCardType != null &&
      this.cartService.selectedCardType == this.selectedType
    ) {
      this.cartService.selectedCardType = null;
      this.selectedType = null;
      this.cardCharges = 0;
      this.cartService.cardCharges = 0;
    }

    this.cartService.selectedCardType = this.selectedType;

    if (this.cartService.selectedCardType != null) {
      this.paymentMethodService
        .getCardCharges(this.selectedType, this.cartService.getTotal())
        .map((response: any) => {
          return <any>response;
        })
        .subscribe(
          (result) => {
            if (result) {
              this.cardCharges = result.card_charges;
              this.cartService.cardCharges = this.cardCharges;
            }
          },
          (error) => {}
        );
    }
  }

  proceedNext() {
    if (
      this.cartService.tableId === null &&
      this.settingService.getLoginScreenPlacement() === "Guest Checkout"
    ) {
      return true;
    }

    if (
      this.cartService.tableId == null &&
      this.cartService.isDelivery != null
    ) {
      if (
        this.cartService.locationDeliveryPartner &&
        this.cartService.isDelivery
      ) {
        if (this.cartService.userAddress == null) return false;
      }

      if (this.cartService.departmentName == null) return false;
    }

    return true;
  }
}

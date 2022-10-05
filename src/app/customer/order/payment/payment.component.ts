import { CommonOrderService } from './../../../_services/customer/common-order.service';
import { DeleteConfirmComponent } from './../../../shared/delete-confirm/delete-confirm.component';
import { LocationModel } from 'app/_models/location.model';
import { MenuModel } from 'app/_models/menu.model';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { CartService } from "./../../../_services/customer/cart.service";
import { SettingService } from "app/_services/customer/setting.service";
import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { TicketModel } from "app/_models/ticket.model";
import { SelectItem } from "primeng/components/common/selectitem";
import { PaymentMethodModel } from "app/_models/payment-method.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { forkJoin } from "rxjs/observable/forkJoin";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"]
})
export class PaymentComponent implements OnInit, OnDestroy {
  public loading: boolean;
  public uuid: string = null;
  public locationId: string = null;
  types: SelectItem[] = new Array();
  public selectedType: string = null;
  public location: LocationModel;

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    event.returnValue = false;
  }

  constructor(
    public settingService: SettingService,
    public translate: TranslateService,
    public cartService: CartService,
    public commonOrderService: CommonOrderService,
    public http: HttpClient,
    public route: ActivatedRoute,
    public router: Router,
    public modalService: NgbModal
  ) {

    this.uuid = this.route.snapshot.params["uuid"];
    this.locationId = this.route.snapshot.params["locationId"];

    forkJoin([this.http.get('customer/get/location/' + this.locationId)
      .map(
        (response: any) => {
          return <LocationModel>response;
        }
      ), this.http
        .get("customer/payment-methods/get/location/" + this.locationId)
        .map((response: any) => {
          return <PaymentMethodModel[]>response;
        })]).subscribe(
          result => {
            this.location = result["0"];

            if (result["1"]) {
              for (const paymentMethod of result["1"]) {
                if (this.location.payment_methods !== null && this.location.payment_methods.filter(item => item == paymentMethod.label)) {
                  if (paymentMethod.payment_method === "Cash") {
                    this.types.push({
                      label: paymentMethod.label,
                      value: paymentMethod.payment_method,
                      icon: "pi pi-money-bill"
                    });
                  } else {
                    this.types.push({
                      label: paymentMethod.label,
                      value: paymentMethod.payment_method,
                      icon: "fa fa-fw fa-cc-visa"
                    });
                  }
                }
              }
            }
          }
        );
  }

  ngOnInit() {
    this.cartService.recalculate();
  }

  placeOrder() {
    this.loading = true;

    if (this.selectedType === "Cash" || this.selectedType === null) {
      this.http
        .post("customer/ticket", {
          location_id: this.locationId,
          menus: this.cartService.cartMenus,
          payment_method: this.selectedType,
          order_preference: this.commonOrderService.orderPreference,
          table_id: localStorage.getItem("tableId"),
          user_id: localStorage.getItem("user_id"),
          taxes: this.cartService.taxes,
          otp: this.cartService.otp
        })
        .map((response: any) => {
          return <TicketModel>response;
        })
        .subscribe(
          result => {
            this.cartService.cartMenus = [...[]];
            this.cartService.taxes = new Array();
            localStorage.removeItem('user_id');
            return this.router.navigate([
              "order/" + this.uuid + "/order-placed/ticket/" + result.id
            ]);
          },
          error => {
            this.loading = false;
          }
        );
    } else {
      this.router.navigate([
        "order/" + this.uuid + "/location/" + this.locationId + "/" + this.selectedType
      ]);
    }
  }

  homeClicked() {
    this.router.navigate([
      "order/" + this.uuid + "/location/" + this.locationId
    ]);
  }

  checkIfValid() {
    if (this.cartService.tableId !== null) {
      return false;
    } else if (this.cartService.getTotal() > 0) {
      if (this.types && this.types.length > 0 && this.selectedType === null) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  clearClicked() {
    const modal = this.modalService.open(DeleteConfirmComponent, { size: 'lg' }).componentInstance;
    modal.caption = 'Are you sure to clear the cart?';
    modal.action.subscribe(
      result => {
        if (result === true) {
          this.cartService.taxes = new Array();
          this.cartService.cartMenus = new Array();
          this.homeClicked();
        }
      }
    );
  }

  getName(name: string) {
    if (name.length > 24)
      return name.substring(0, 24) + "...";
    else
      return name;
  }

  getMenuPrice(menu: MenuModel) {
    let price = menu.sub_total_amount;
    if (menu.upsell_items.length > 0) {
      for (const upsell of menu.upsell_items) {
        price -= upsell.price_with_details.price * menu.selected_quantity;
      }
    }

    return price;
  }

  ngOnDestroy() {

  }
}

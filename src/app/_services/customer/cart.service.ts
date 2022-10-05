import { LocationModel } from "./../../_models/location.model";
import { CommonOrderService } from "./common-order.service";
import { SettingService } from "./setting.service";
import { TagModel } from "./../../_models/tag.model";
import { ProductComboModel } from "./../../_models/product-combo.model";
import { HttpClient } from "@angular/common/http";
import { AddOnModel } from "./../../_models/add-on.model";
import { MenuModel } from "app/_models/menu.model";
import { Injectable } from "@angular/core";
import { TicketModel } from "app/_models/ticket.model";
import { ActivatedRoute } from "@angular/router";
import { DepartmentModel } from "app/_models/department.model";

@Injectable({
  providedIn: "root",
})
export class CartService {
  //public brandMenuSelected: number;
  public tableId: number = null;
  public otp: number = null;
  public cartMenus: MenuModel[] = new Array();
  public taxes = new Array();
  public backLinks: string[] = [];
  public location: LocationModel = null;
  public deliveryCharge: number = 0;
  public finalAmount: number = 0;
  public locationId: number;
  public departmentName: string = null;
  public departmentObj: DepartmentModel = null;
  public includeDepartmentCharges: boolean = true;
  public includeCardCharges: boolean = false;
  public includeDeliveryCharges: boolean = true;
  public totalAmount: number = 0;
  public departmentCharge: number = 0;
  public userAddress: number;
  public departmentChargeType: string = null;
  public departmentCaption: string = null;
  public cardCharges: number = null;
  public locationDeliveryPartner: string = null;
  public remarks: string = null;
  public isDelivery: boolean = null;
  public userId = null;
  public _rubberState: boolean = false;
  public departmentTaxeDetails: any[];
  public departmentTaxSum: number = 0;
  public continueAsGuest: boolean = false;
  public selectedCardType: string = null;

  set rubberState(value) {
    this._rubberState = value;
  }

  get rubberState() {
    return this._rubberState;
  }

  public departmentTaxes: any = null;

  constructor(
    public http: HttpClient,
    public settingService: SettingService,
    public commonOrderService: CommonOrderService,
    public route: ActivatedRoute
  ) {
    // if (localStorage.getItem("test"))
    //   this.cartMenus = JSON.parse(localStorage.getItem("test")); //17392.17 + 1739.22 + 869.61
    // this.getDepartments()
  }

  getMenuPrice(menu: MenuModel) {
    let total = 0;
    let subTotal = 0;
    let displayPrice = 0;

    menu.total_amount = 0;
    menu.sub_total = 0;
    menu.tax_object = [];

    if (!menu.selected_quantity) menu.selected_quantity = 1;

    if (!menu.display_price) {
      menu.display_price = 0;
    }

    for (const portion of menu.product.product_portions) {
      total +=
        portion.price_with_details.price_with_tax * menu.selected_quantity;
      subTotal +=
        portion.price_with_details.price_without_tax * menu.selected_quantity;
      displayPrice += portion.price_with_details.price * menu.selected_quantity;

      this.addInTax(menu, portion.price_with_details, 1, true, menu);
    }

    //Normal product
    {
      if (menu.product && menu.product.selected_tags) {
        for (const tag of menu.product.selected_tags) {
          this.getTagTotal(menu, tag, menu.selected_quantity);
          total += tag.total_amount;
          subTotal += tag.sub_total_amount;
          displayPrice += tag.display_price;
        }
      }
    }

    //Combo
    {
      if (menu.product && menu.product.is_combo === true) {
        for (const productCombo of menu.product.product_combos) {
          this.getProductComboTotal(menu, productCombo);
          total += productCombo.total_amount;
          subTotal += productCombo.sub_total_amount;
          displayPrice += productCombo.display_price;
        }
      }
    }

    //Upselling items
    {
      if (menu.upsell_items && menu.upsell_items.length > 0) {
        for (const upsellProduct of menu.upsell_items) {
          upsellProduct.display_price = 0;
          upsellProduct.total_amount = 0;
          upsellProduct.sub_total_amount = 0;

          if (upsellProduct.price_with_details) {
            total +=
              upsellProduct.price_with_details.price_with_tax *
              menu.selected_quantity;
            subTotal +=
              upsellProduct.price_with_details.price_without_tax *
              menu.selected_quantity;

            upsellProduct.display_price +=
              upsellProduct.price_with_details.price * menu.selected_quantity;
            upsellProduct.total_amount +=
              upsellProduct.price_with_details.price_with_tax *
              menu.selected_quantity;
            upsellProduct.sub_total_amount +=
              upsellProduct.price_with_details.price_without_tax *
              menu.selected_quantity;

            this.addInTax(
              menu,
              upsellProduct.price_with_details,
              1,
              true,
              upsellProduct
            );
          }

          if (
            upsellProduct.selected_tags &&
            upsellProduct.selected_tags.length > 0
          ) {
            for (const tag of upsellProduct.selected_tags) {
              this.getTagTotal(menu, tag, menu.selected_quantity);
              total += tag.total_amount;
              subTotal += tag.sub_total_amount;

              upsellProduct.display_price += tag.display_price;
              upsellProduct.total_amount += tag.total_amount;
              upsellProduct.sub_total_amount += tag.sub_total_amount;
            }
          }

          if (upsellProduct.is_combo === true) {
            for (const productCombo of upsellProduct.product_combos) {
              this.getProductComboTotal(menu, productCombo);
              total += productCombo.total_amount;
              subTotal += productCombo.sub_total_amount;

              upsellProduct.display_price += productCombo.display_price;
              upsellProduct.total_amount += productCombo.total_amount;
              upsellProduct.sub_total_amount += productCombo.sub_total_amount;
            }
          }
        }
      }
    }

    menu.display_price = displayPrice;
    menu.total_amount = total;
    menu.sub_total_amount = subTotal;
  }

  menuQuantityIncreased(menu) {
    menu.selected_quantity++;
    this.recalculate(this.locationId);
  }

  menuQuantityDecreased(menu) {
    menu.selected_quantity--;
    this.recalculate(this.locationId);
  }

  getTotal() {
    let total = 0;
    for (const menu of this.cartMenus) {
      total += menu.total_amount;
    }

    return total + this.departmentTaxSum;
  }

  getTagTotal(
    menu: any,
    tag: TagModel,
    quantity = 1,
    parentMenu: any = null,
    testing: boolean = false
  ) {
    tag.total_amount = 0;
    tag.sub_total_amount = 0;
    tag.display_price = 0;

    for (const tagItem of tag.tag_items) {
      if (tagItem.is_selected === true) {
        tag.total_amount +=
          tagItem.selected_quantity *
          tagItem.price_with_details.price_with_tax *
          quantity;
        tag.sub_total_amount +=
          tagItem.selected_quantity *
          tagItem.price_with_details.price_without_tax *
          quantity;
        tag.display_price +=
          tagItem.selected_quantity *
          tagItem.price_with_details.price *
          quantity;
        this.addInTax(
          menu,
          tagItem.price_with_details,
          tagItem.selected_quantity * quantity,
          true,
          tagItem,
          parentMenu
        ); //Parent manu is used to handle tax for multiple brands
      }
    }
  }

  addInTax(
    menu: MenuModel,
    priceWithDetail: any,
    quantity: number,
    testing: boolean = false,
    tagItem = null,
    parentMenu: any = null
  ) {
    //Parent manu is used to handle tax for multiple brands and used in getTagsTotal for ProductCombo
    if (parentMenu !== null) menu = parentMenu;

    for (const tax of priceWithDetail.tax_price) {
      if (
        this.taxes.length > 0 &&
        this.taxes.findIndex((item) => item.name === tax.name) > -1
      ) {
        const _tax = this.taxes.find((item) => item.name === tax.name);
        _tax.tax += tax.tax * quantity * menu.selected_quantity;

        if (testing) {
          console.log(tagItem);
          console.log(tax.tax * quantity * menu.selected_quantity);
        }
      } else {
        const newTax = JSON.parse(JSON.stringify(tax));

        if (testing) {
          console.log(tagItem);
          console.log(newTax.tax * <number>quantity * menu.selected_quantity);
        }

        newTax.tax = newTax.tax * <number>quantity * menu.selected_quantity;
        this.taxes.push(newTax);
      }

      if (
        menu.tax_object.length > 0 &&
        menu.tax_object.findIndex((item) => item.name === tax.name) > -1
      ) {
        const _tax = menu.tax_object.find((item) => item.name === tax.name);
        _tax.tax += tax.tax * quantity * menu.selected_quantity;
      } else {
        const newTax = JSON.parse(JSON.stringify(tax));
        newTax.tax = newTax.tax * <number>quantity * menu.selected_quantity;
        menu.tax_object.push(newTax);
      }
    }
  }

  calculateDepartmentTax() {
    for (const tax of this.departmentTaxes) {
      if (
        this.taxes.length > 0 &&
        this.taxes.findIndex((item) => item.name === tax.name) > -1
      ) {
        const _tax = this.taxes.find((item) => item.name === tax.name);
        _tax.tax += tax.tax;
        this.departmentTaxSum += tax.tax;
      } else {
        const newTax = JSON.parse(JSON.stringify(tax));
        this.departmentTaxSum += newTax.tax;
        this.taxes.push(newTax);
      }
    }

    console.log(this.departmentTaxSum);
  }

  getProductComboTotal(
    menu: MenuModel,
    productCombo: ProductComboModel,
    testing: boolean = false
  ) {
    productCombo.total_amount = 0;
    productCombo.sub_total_amount = 0;
    productCombo.display_price = 0;

    for (const productComboItem of productCombo.product_combo_items) {
      if (productComboItem.auto_select === true) {
        productCombo.total_amount +=
          productComboItem.selected_quantity *
          productComboItem.price_with_details.price_with_tax *
          menu.selected_quantity;
        productCombo.sub_total_amount +=
          productComboItem.selected_quantity *
          productComboItem.price_with_details.price_without_tax *
          menu.selected_quantity;
        productCombo.display_price +=
          productComboItem.selected_quantity *
          productComboItem.price_with_details.price *
          menu.selected_quantity;

        this.addInTax(
          menu,
          productComboItem.price_with_details,
          productComboItem.selected_quantity,
          true,
          productComboItem
        );

        if (productComboItem.product.is_combo === true) {
          for (const _productCombo of productComboItem.product.product_combos) {
            this.getProductComboTotal(menu, _productCombo, true);
            productCombo.total_amount += _productCombo.total_amount;
            productCombo.sub_total_amount += _productCombo.sub_total_amount;
            productCombo.display_price += _productCombo.display_price;
          }
        }

        if (
          productComboItem.product &&
          productComboItem.product.selected_tags &&
          productComboItem.product.selected_tags.length > 0
        ) {
          for (const tag of productComboItem.product.selected_tags) {
            // console.log(productComboItem.selected_quantity * menu.selected_quantity);
            this.getTagTotal(
              productComboItem,
              tag,
              productComboItem.selected_quantity * menu.selected_quantity,
              menu,
              true
            );
            // console.log(this.taxes);
            productCombo.total_amount += tag.total_amount;
            productCombo.sub_total_amount += tag.sub_total_amount;
            productCombo.display_price += tag.display_price;
          }
        }
      }
    }
  }

  getSubtotal() {
    let total = 0;
    for (const menu of this.cartMenus) {
      total += menu.sub_total_amount;
    }
    return total;
  }

  removeFromCart(menu: MenuModel) {
    //Check is already added.
    if (this.cartMenus.findIndex((item) => item.id === menu.id) >= 0) {
      const _menu = this.cartMenus.find((item) => item.id === menu.id);

      if (_menu.quantity > 0) {
        _menu.quantity--;
      }
    }

    // this.getTaxes();
    this.recalculate();
  }

  addToCart(menu: MenuModel, portion: any = null, addOns: AddOnModel[] = null) {
    if (isNaN(menu.quantity)) {
      menu.quantity = 1;
    }

    if (portion) {
      menu.product.product_portions = new Array();
      menu.product.product_portions.push(portion);
    }

    this.cartMenus.push(menu);
    setTimeout(() => {
      this.getMenuPrice(menu);
    }, 100);

    // localStorage.setItem('test', JSON.stringify(this.cartMenus));
  }

  delete(_index) {
    this.cartMenus.splice(_index, 1);
    //this.getTaxes();
    this.recalculate(this.locationId);
  }

  recalculate(location_id = null) {
    this.locationId = location_id;

    this.taxes = new Array();
    this.departmentTaxSum = 0;

    for (const menu of this.cartMenus) {
      this.getMenuPrice(menu);
    }

    if (this.includeDeliveryCharges && this.tableId == null)
      this.getDeliveryCharges();

    if (this.includeDepartmentCharges && this.tableId == null)
      this.getDepartmentCharge();

    //If local storage has table id
    if (this.tableId !== null) {
      this.getDepartmentForTable();
    }
  }

  placeOrder(form: any, uuid: string, locationId: number = null) {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      this.userId = user.id;
    }

    return this.http
      .post("customer/make-payment", {
        card: form,
        menus: this.cartMenus,
        taxes: this.taxes,
        uuid: uuid,
        location_id: locationId,
        table_id: this.tableId,
        order_preference: this.commonOrderService.orderPreference,
        otp: this.otp,
        user_id: this.userId,
        user_address_id: this.userAddress,
        delivery_charge: this.deliveryCharge,
        department_charge: {
          amount_type: this.departmentChargeType,
          amount: this.departmentCharge,
          caption: this.departmentCaption,
          taxes: this.departmentTaxes,
        },
        remarks: this.remarks,
        card_charges: this.cardCharges,
      })
      .map((response: any) => {
        localStorage.removeItem("user_id");
        this.cartMenus = [...[]];
        return <TicketModel>response;
      });
  }

  getDeliveryCharges() {
    this.http
      .post("delivery/charge", {
        total_amount: this.getTotal(),
        location_id: this.locationId,
      })
      .map((response: any) => {
        return response;
      })
      .subscribe((result) => {
        if (result && result.delivery_charge) {
          this.deliveryCharge = result.delivery_charge;
        }
      });
  }

  getBackground(menu: MenuModel) {
    if (this.cartMenus.filter((item) => item.id === menu.id).length > 0) {
      return "#d6d3d3";
    }
    return this.settingService.getMenuBackgroundColor();
  }

  getBackgroundKiosk(menu: MenuModel) {
    if (this.cartMenus.filter((item) => item.id === menu.id).length > 0) {
      return "#d6d3d3";
    }
    return "white";
  }

  placeOrderV2(locationId, paymentMethod = "Cash") {
    return this.http
      .post("customer/ticket", {
        location_id: locationId,
        menus: this.cartMenus,
        payment_method: paymentMethod,
        table_id: localStorage.getItem("tableId"),
        // user_id: localStorage.getItem("user_id"),
        taxes: this.taxes,
        otp: this.otp,
      })
      .map((response: any) => {
        this.cartMenus = [...[]];
        this.taxes = new Array();
        localStorage.removeItem("user_id");
        this.tableId = null;
        return <TicketModel>response;
      });
  }

  placeOrderWithPaytm(form: any, uuid: string, locationId: number = null) {
    return this.http
      .post("paytm/initiate", {
        card: form,
        menus: this.cartMenus,
        taxes: this.taxes,
        uuid: uuid,
        location_id: locationId,
        table_id: this.tableId,
        order_preference: this.commonOrderService.orderPreference,
        otp: this.otp,
        user_id: localStorage.getItem("user_id"),
      })
      .map((response: any) => {
        localStorage.removeItem("user_id");
        this.cartMenus = [...[]];
        return <TicketModel>response;
      });
  }

  getDepartmentCharge() {
    this.http
      .post("department/tax/charges", {
        location_id: this.locationId,
        department: this.departmentName,
        total_amount: this.getSubtotal(),
      })
      .map((response: any) => {
        return <DepartmentModel>response;
      })
      .subscribe((result) => {
        this.departmentObj = result;

        if (this.departmentObj) {
          // if (this.departmentObj.percent_charge_amount == null) {
          //   this.departmentCharge = this.departmentObj.amount;
          // } else {
          //   this.departmentCharge = this.departmentObj.percent_charge_amount;
          // }

          this.departmentCharge =
            this.departmentObj.tax_data["price"] -
            this.departmentObj.tax_data["total_tax"];
          this.departmentChargeType = this.departmentObj.amount_type;
          this.departmentCaption = this.departmentObj.caption;

          if (this.departmentObj.tax_data["taxes"]) {
            this.departmentTaxes = this.departmentObj.tax_data["taxes"];
            this.calculateDepartmentTax();
          }
        }
      });
  }

  getTableDepartmentCharge() {
    // get/table/department/details
    this.http
      .post("table/department/tax/charges", {
        location_id: this.locationId,
        table_id: this.tableId,
        department: this.departmentName,
        total_amount: this.getSubtotal(),
        otp: this.otp,
      })
      .map((response: any) => {
        return <DepartmentModel>response;
      })
      .subscribe((result) => {
        this.departmentObj = result;

        if (this.departmentObj) {
          // if (this.departmentObj.percent_charge_amount == null) {
          //   this.departmentCharge = this.departmentObj.amount;
          // } else {
          //   this.departmentCharge = this.departmentObj.percent_charge_amount;
          // }
          this.departmentCharge =
            this.departmentObj.tax_data["price"] -
            this.departmentObj.tax_data["total_tax"];
          this.departmentChargeType = this.departmentObj.amount_type;
          this.departmentCaption = this.departmentObj.caption;

          if (this.departmentObj.tax_data["taxes"]) {
            this.departmentTaxes = this.departmentObj.tax_data["taxes"];
            this.calculateDepartmentTax();
          }
        }
      });
  }

  getDepartmentForTable() {
    // Get department
    this.http
      .get("custom/get/department/table/" + this.tableId)
      .map((response: any) => {
        return <any>response;
      })
      .subscribe((result) => {
        if (result) {
          this.departmentName = result.name;
          this.getTableDepartmentCharge();
        }
      });
  }
}

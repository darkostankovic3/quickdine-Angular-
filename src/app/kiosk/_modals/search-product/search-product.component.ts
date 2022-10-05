import { BrandModel } from "./../../../_models/brand.model";
import { HttpClient } from "@angular/common/http";
import { Subscription } from "rxjs";
import { SettingService } from "./../../../_services/customer/setting.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { BrandMenuModel } from "app/_models/brand-menu.model";
import { MenuService } from "./../../../_services/customer/menu.service";
import { FormGroup } from "@angular/forms";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-search-product",
  templateUrl: "./search-product.component.html",
  styleUrls: ["./search-product.component.scss"],
})
export class SearchProductComponent implements OnInit {
  public brandMenus: BrandMenuModel[];
  public brand: BrandModel;

  public _form: FormGroup = null;
  @Input("form")
  set form(value: FormGroup) {
    this._form = value;
  }
  get form() {
    return this._form;
  }

  public _locationId: any = null;
  @Input("locationId")
  set locationId(value: any) {
    this._locationId = value;
  }
  get locationId() {
    return this._locationId;
  }

  public _uuid: any = null;
  @Input("uuid")
  set uuid(value: any) {
    this._uuid = value;
  }
  get uuid() {
    return this._uuid;
  }

  public _brandMenuId: number = null;
  @Input("brandMenuId")
  set brandMenuId(value: any) {
    this._brandMenuId = value;

    if (value) {
      this.http
        .get("brand/custom/name/" + value)
        .map((response: any) => {
          return <BrandModel>response;
        })
        .subscribe((result) => {
          this.brand = result;
        });
    }
  }
  get brandMenuId() {
    return this._brandMenuId;
  }

  private subscription: Subscription;
  public lastPage: number = null;
  public currentPage: number = 0;
  public loading: boolean;
  public lastBodyParam: any;
  public totalRecords: number = null;
  public menus: any = null;

  constructor(
    public menuService: MenuService,
    public activeModal: NgbActiveModal,
    public settingService: SettingService,
    public http: HttpClient
  ) {}

  ngOnInit() {
    this.onSubmit();
  }

  onSubmit() {
    const form = this.form.value;
    this.currentPage = 0;
    this.menus = [];

    if (this.brandMenuId) form.brand_menu_id = this.brandMenuId;

    this.getProducts(form);
  }

  getProducts(postBody: any = null) {
    if (this.lastPage === null || this.lastPage > this.currentPage) {
      this.loading = true;

      if (this.subscription) this.subscription.unsubscribe();

      if (!postBody) postBody = {};

      postBody.current_page = this.currentPage;

      if (this.brandMenuId) postBody.brand_menu_id = this.brandMenuId;

      this.lastBodyParam = postBody;
      this.lastBodyParam.current_page = this.currentPage;

      this.subscription = this.menuService
        .getMenuWithoutBrandIdV2(this.uuid, this.locationId, postBody)
        .subscribe((result) => {
          this.lastPage = result.last_page;
          this.currentPage = result.current_page;
          this.totalRecords = result.total;

          if (this.menus) {
            this.menus = [
              ...this.menus,
              ...JSON.parse(JSON.stringify(result.data)),
            ];
          } else {
            this.menus = [...JSON.parse(JSON.stringify(result.data))];
          }

          // if (this.brandMenuId !== null && this.brandMenus.length > 0)
          //   this.label = this.brandMenus[0].name;
          this.loading = false;
        });
    }
  }

  resetAndSubmit() {
    this.form.patchValue({
      search: null,
    });

    this.onSubmit();
  }

  closeModal() {
    this.activeModal.close();
  }
}

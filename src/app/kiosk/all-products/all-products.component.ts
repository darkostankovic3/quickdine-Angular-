import { HttpClient } from "@angular/common/http";
import { Subscription } from "rxjs";
import { CartService } from "app/_services/customer/cart.service";
import { SettingService } from "app/_services/customer/setting.service";
import { BrandMenuModel } from "app/_models/brand-menu.model";
import { MenuService } from "./../../_services/customer/menu.service";
import { MenuModel } from "app/_models/menu.model";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SearchProductComponent } from "../_modals/search-product/search-product.component";

@Component({
  selector: "app-all-products",
  templateUrl: "./all-products.component.html",
  styleUrls: ["./all-products.component.scss"],
})
export class AllProductsComponent implements OnInit, OnDestroy {
  public uuid: string = null;
  public menus: MenuModel[] = null;
  public locationId: number = null;
  public brandMenuId: number = null;
  public brandMenus: BrandMenuModel[];
  public label = "";
  public type: string = null;
  public lastPage: number = null;
  public totalRecords: number;
  public currentPage: number = 0;
  private subscription: Subscription;
  public loading: boolean = false;
  public lastBodyParam: any = {};
  public form: FormGroup;
  public filterCategoryList: any;

  constructor(
    public route: ActivatedRoute,
    public menuService: MenuService,
    public settingService: SettingService,
    public cartService: CartService,
    public router: Router,
    public fb: FormBuilder,
    private modalService: NgbModal,
    public http: HttpClient
  ) {
    this.uuid = this.route.snapshot.params["uuid"];
    this.locationId = this.route.snapshot.params["locationId"];

    if (this.route.snapshot.params["brandMenuId"]) {
      this.brandMenuId = this.route.snapshot.params["brandMenuId"];

      this.http
        .get("get/brand-menu/details/" + this.brandMenuId)
        .map((response) => {
          return <BrandMenuModel>response;
        })
        .subscribe((result) => {
          this.label = result.display_label;
        });
    } else this.label = "";

    if (this.route.snapshot.queryParams.type)
      this.type = this.route.snapshot.queryParams.type;

    this.getProducts();
  }

  ngOnInit() {
    if (this.menuService.categories.length === 0) {
      this.menuService
        .getMenuCategoryWithoutBrandId(this.uuid, this.locationId)
        .subscribe((result) => {
          this.menuService.categories = JSON.parse(JSON.stringify(result));
        });
    }

    this.form = this.fb.group({
      search: [null],
      menu_id: [null],
      category_id: [null],
    });
  }

  searchProducts(event) {
    this.menus = null;
    this.currentPage = 0;
    this.getProducts(event);
  }

  getProducts(postBody: any = null) {
    if (this.lastPage === null || this.lastPage > this.currentPage) {
      this.loading = true;

      if (this.subscription) this.subscription.unsubscribe();

      if (!postBody) postBody = {};

      postBody.current_page = this.currentPage;

      if (this.type) postBody.type = this.type;

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

  productClicked(brandMenu: any, record: any) {
    this.cartService.backLinks.push(this.router.url);
    this.router.navigate([
      "/kiosk/uuid/" +
        this.uuid +
        "/location/" +
        this.locationId +
        "/brands/" +
        brandMenu.brand_menu_id +
        "/catalogue/" +
        brandMenu.menu.id +
        "/product/" +
        record.id,
    ]);
  }

  ngOnDestroy() {
    this.menuService.categorySelected = null;
  }

  search() {
    console.log(this.form.value);
    this.openModal();
  }

  openModal() {
    const modalRef = this.modalService.open(SearchProductComponent, {
      size: "lg",
      windowClass: "xt-modal-class",
    }).componentInstance;

    modalRef.form = this.form;
    modalRef.locationId = this.locationId;
    modalRef.uuid = this.uuid;

    if (this.brandMenuId) modalRef.brandMenuId = this.brandMenuId;
  }

  categoryClicked(event) {
    if (event) {
      this.menus = null;
      this.currentPage = 0;
      this.form.patchValue({
        category_id: event.id,
      });
      this.menuService.categorySelected = event.id;
    } else {
      this.menus = null;
      this.currentPage = 0;
      this.form.patchValue({
        category_id: null,
      });
      this.menuService.categorySelected = null;
    }

    this.getProducts(this.form.value);
  }
}

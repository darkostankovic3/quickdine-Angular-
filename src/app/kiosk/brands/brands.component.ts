import { Subscription } from "rxjs";
import { CartService } from "app/_services/customer/cart.service";
import { LocationModel } from "app/_models/location.model";
import { LocationService } from "app/_services/tenant/location.service";
import { MenuService } from "./../../_services/customer/menu.service";
import { ActivatedRoute, Router } from "@angular/router";
import { BrandMenuModel } from "app/_models/brand-menu.model";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Location } from "@angular/common";
import { FormGroup, FormBuilder } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SearchProductComponent } from "../_modals/search-product/search-product.component";

@Component({
  selector: "app-brands",
  templateUrl: "./brands.component.html",
  styleUrls: ["./brands.component.scss"],
})
export class BrandsComponent implements OnInit, OnDestroy {
  public brandMenus: BrandMenuModel[] = [];
  public uuid: string = null;
  public locationId: number;
  public location: LocationModel;
  private subscription: Subscription;
  public form: FormGroup;

  constructor(
    public http: HttpClient,
    public route: ActivatedRoute,
    public menuService: MenuService,
    public locationService: LocationService,
    public router: Router,
    public cartService: CartService,
    public fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.uuid = this.route.snapshot.params["uuid"];
    this.locationId = this.route.snapshot.params["locationId"];

    this.getBrandMenus();
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

  getBrandMenus(postBody: any = null) {
    let categoryId: number = null;

    if (postBody) categoryId = postBody.category_id;

    if (this.subscription) this.subscription.unsubscribe();

    this.subscription = this.menuService
      .getMenu(this.uuid, this.locationId, categoryId)
      .subscribe((result) => {
        this.brandMenus = result;

        // if (this.brandMenus.length == 1)
        //   this.router.navigate(['order/' + this.uuid + '/location/' + this.locationId + '/brand-menu/' + this.brandMenus[0].id]);
      });
  }

  brandClicked(record: BrandMenuModel) {
    this.menuService.categorySelected = null;

    if (record.is_open === true) {
      this.cartService.backLinks.push(this.router.url);
      // this.router.navigate(['kiosk/uuid/' + this.uuid + '/location/' + this.locationId + '/brands/' + record.id + '/catalogue']);
      this.router.navigate([
        "kiosk/uuid/" +
          this.uuid +
          "/location/" +
          this.locationId +
          "/catalogue/brands/" +
          record.id,
      ]);
    }
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
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

    // if (this.brandMenuId)
    //   modalRef.brandMenuId = this.brandMenuId;
  }

  categoryClicked(event) {
    console.log(event.id);
    this.form.patchValue({
      category_id: event.id,
    });
    this.menuService.categorySelected = event.id;
    this.getBrandMenus(this.form.value);
  }
}

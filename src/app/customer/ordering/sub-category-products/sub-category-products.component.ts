import { MenuModel } from "./../../../_models/menu.model";
import { BrandMenuModel } from "./../../../_models/brand-menu.model";
import { MenuService } from "./../../../_services/customer/menu.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
// import { SearchProductComponent } from '../_modals/search-product/search-product.component';
import { Slider } from "ngx-slider";
import { BrandMenuItemModel } from "app/_models/brand-menu-item.model";

@Component({
  selector: "app-sub-category-products",
  templateUrl: "./sub-category-products.component.html",
  styleUrls: ["./sub-category-products.component.scss"],
})
export class SubCategoryProductsComponent implements OnInit {
  public uuid: string;
  public brandMenuId: number;
  public menuId: number;
  public locationId: number;
  public brandMenu: BrandMenuModel;
  public menus: MenuModel[] = [];

  public lastPage: number = null;
  public totalRecords: number;
  public currentPage: number = 0;
  public loading: boolean;
  public lastBodyParam: any = {};
  public form: FormGroup;
  public slider = new Slider();
  public selectedIndex: number = null;
  public subCategory: string = null;

  constructor(
    public route: ActivatedRoute,
    public menuService: MenuService,
    public fb: FormBuilder,
    private modalService: NgbModal,
    public router: Router
  ) {
    this.uuid = this.route.snapshot.params["uuid"];
    this.brandMenuId = this.route.snapshot.params["brandMenuId"];
    this.menuId = this.route.snapshot.params["menuId"];
    this.locationId = this.route.snapshot.params["locationId"];
    this.subCategory = this.route.snapshot.params["subCategory"];

    this.getProducts();
  }

  ngOnInit() {
    this.form = this.fb.group({
      search: [null],
      menu_id: [null],
      category_id: [null],
    });
  }

  getProducts(postBody: any = null) {
    if (this.lastPage === null || this.lastPage > this.currentPage) {
      this.loading = true;

      if (!postBody) postBody = {};

      postBody.current_page = this.currentPage;

      this.lastBodyParam = postBody;
      this.lastBodyParam.current_page = this.currentPage;

      this.menuService
        .getMenuWithoutBrandIdV2(this.uuid, this.locationId, {
          brand_menu_id: this.brandMenuId,
          menu_id: this.menuId,
          current_page: this.currentPage,
          search: postBody.search,
          sub_category: this.subCategory,
        })
        .subscribe((result) => {
          // this.brandMenu = result;
          // this.menus = result.brand_menu_items[0].menu.menus;

          this.lastPage = result.last_page;
          this.currentPage = result.current_page;
          this.totalRecords = result.total;

          this.menus = [
            ...this.menus,
            ...JSON.parse(JSON.stringify(result.data)),
          ];

          // if (this.brandMenuId !== null && this.brandMenus.length > 0)
          //   this.label = this.brandMenus[0].name;
          this.loading = false;
        });
    }
  }

  onSubmit() {
    // this.openModal();
    this.currentPage = null;
    this.lastPage = null;
    this.menus = [];
    this.getProducts(this.form.value);
  }

  menuClicked(brandMenuItem: BrandMenuItemModel, index: number) {
    this.router.navigate([
      "ordering/" +
        this.uuid +
        "/locations/" +
        this.locationId +
        "/brand-menu/" +
        this.brandMenuId +
        "/menu/" +
        brandMenuItem.menu.id,
    ]);
  }

  getSubcategories() {}
}

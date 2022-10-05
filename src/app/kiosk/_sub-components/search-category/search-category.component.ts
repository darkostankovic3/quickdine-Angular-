import { CategoryModel } from './../../../_models/category.model';
import { SearchProductComponent } from './../../_modals/search-product/search-product.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CartService } from 'app/_services/customer/cart.service';
import { MenuService } from './../../../_services/customer/menu.service';
import { ActivatedRoute } from '@angular/router';
import { BrandMenuModel } from './../../../_models/brand-menu.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-category',
  templateUrl: './search-category.component.html',
  styleUrls: ['./search-category.component.scss']
})
export class SearchCategoryComponent implements OnInit {
  @Output() searchProducts = new EventEmitter<any>();
  public _brandMenuCateogory: BrandMenuModel[] = [];

  public _brandMenus: BrandMenuModel[] = [];
  @Input('brandMenus')
  set brandMenus(value: BrandMenuModel[]) {
    this._brandMenus = JSON.parse(JSON.stringify(value));
  }
  get menu() {
    return this._brandMenus;
  }

  public _brandMenuId: number = null;
  @Input('brandMenuId')
  set brandMenuId(value: number) {
    this._brandMenuId = value;
  }
  get brandMenuId() {
    return this._brandMenuId;
  }

  public _locationId: number = null;
  @Input('locationId')
  set locationId(value: number) {
    this._locationId = value;
  }
  get locationId() {
    return this._locationId;
  }

  public _uuid: string = null;
  @Input('uuid')
  set uuid(value: string) {
    this._uuid = value;
  }
  get uuid() {
    return this._uuid;
  }

  public form: FormGroup;

  constructor(public route: ActivatedRoute,
    public menuService: MenuService,
    public cartService: CartService,
    public fb: FormBuilder,
    private modalService: NgbModal) {

  }

  ngOnInit() {
    if (this.menuService.categories.length === 0) {
      this.menuService
        .getMenuCategoryWithoutBrandId(this.uuid, this.locationId)
        .subscribe(result => {
          this.menuService.categories = JSON.parse(JSON.stringify(result));
        });
    }

    this.form = this.fb.group({
      search: [null],
      menu_id: [null],
      category_id: [null]
    });
  }

  brandMenuClicked(id: number) {
    this.form.patchValue({
      menu_id: id
    });
    this.menuService.categorySelected = id;
    this.searchProducts.emit(this.form.value);
  }

  onSubmit() {
    this.openModal();
    // this.searchProducts.emit(this.form.value);
  }


  getProducts() {
    const form = this.form.value;

    this.menuService
      .getMenuWithoutBrandId(this.uuid, this.locationId, form)
      .subscribe(result => {
      });
  }

  openModal() {
    const modalRef = this.modalService.open(SearchProductComponent, {
      size: 'lg',
      windowClass: 'xt-modal-class'
    }).componentInstance;

    modalRef.form = this.form;
    modalRef.locationId = this.locationId;
    modalRef.uuid = this.uuid;

    if (this.brandMenuId)
      modalRef.brandMenuId = this.brandMenuId;
  }

  getCategories() {
    if (this.brandMenuId)
      return this.menuService.categories.filter(item => item.id == this.brandMenuId);
    else
      return this.menuService.categories;
  }

  categoryClicked(categoryId: number) {
    this.form.patchValue({
      category_id: categoryId,
      current_page: 0
    });
    this.menuService.categorySelected = categoryId;
    this.searchProducts.emit(this.form.value);
  }
}

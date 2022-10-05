import { ProductService } from 'app/_services/tenant/product.service';
import { CustomValidators } from 'ng2-validation';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { BrandLocationProductModel } from './../../../../_models/brand-location-product.model';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductModel } from 'app/_models/product.model';
import { isArray } from 'util';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-price',
  templateUrl: './add-price.component.html',
  styleUrls: ['./add-price.component.scss']
})
export class AddPriceComponent implements OnInit {
  public loading: boolean = false;

  public _isNew: boolean;
  @Input('isNew')
  set isNew(value: boolean) {
    this._isNew = value;
  }
  get isNew() {
    return this._isNew;
  }

  public _productId: number = null;
  @Input('productId')
  set productId(value: number) {
    this._productId = value;
  }
  get productId() {
    return this._productId;
  }

  public _brandLocationId: number = null;
  @Input('brandLocationId')
  set brandLocationId(value: number) {
    this._brandLocationId = value;
  }
  get brandLocationId() {
    return this._brandLocationId;
  }

  public _product: ProductModel = null;
  set product(value: ProductModel) {
    this._product = value;
    this.addArrayForProduct();
  }
  get product() {
    return this._product;
  }
  public form: FormGroup;
  public products: ProductModel[];
  @Output() recordAdded = new EventEmitter<any>();

  constructor(public modal: NgbActiveModal,
    public http: HttpClient,
    private toastr: ToastrService,
    public fb: FormBuilder,
    public productService: ProductService,
    public translate: TranslateService) { }

  ngOnInit() {
    this.form = this.fb.group({
      brand_location_id: [this.brandLocationId],
      product_id: [this.productId, [Validators.required]],
      portions: this.fb.array([])
    });

    if (this.productId && this.brandLocationId) {
      this.http.get('location/custom/get/brand-location/' + this.brandLocationId + '/product/' + this.productId)
        .map(
          (response: any) => {
            return <ProductModel>response;
          }
        )
        .subscribe(
          result => {
            this.product = result;
          },
          error => {
            this.toastr.error('Something Went Wrong', 'Error');
          }
        );
    }

    if (this.isNew === true) {
      this.productService.getAllRecordsForBrandLocation(this.brandLocationId)
        .subscribe(
          result => {
            this.products = [...result];
          }
        );
    }
  }

  addArrayForProduct() {
    const portions = this.form.get('portions') as FormArray;

    while (portions.length !== 0)
      portions.removeAt(0)

    for (const _portion of this.product.product_portions) {
      let price = _portion.product_portion_price.price;

      if (this.product.brand_location_products !== null && isArray(this.product.brand_location_products)) {
        const existingPortion = this.product.brand_location_products.find((item) => {
          return item.product_id === this.product.id && item.product_portion_id === _portion.id;
        });

        if (existingPortion)
          price = existingPortion.price
      }

      portions.push(this.fb.group({
        name: [_portion.name],
        id: [_portion.id, [Validators.required]],
        price: [price, [Validators.required, CustomValidators.number]]
      }));
    }
  }

  onSubmit() {
    this.loading = true;

    this.http.post('location/custom/brand-location/update/price', this.form.value)
      .subscribe(
        result => {
          if (this.isNew === true)
            this.recordAdded.emit();

          this.modal.close();
        },
        error => {
          this.loading = false;
        }
      );
  }

  productSelected() {
    this.product = { ...this.products.find(item => item.id === this.form.value.product_id) };
  }
}

import { PaymentMethodModel } from './../../../_models/payment-method.model';
import { BrandLocationProductModel } from './../../../_models/brand-location-product.model';
import { ProductService } from 'app/_services/tenant/product.service';
import { BrandLocationModel } from './../../../_models/brand-location.model';
import { BrandService } from './../../../_services/tenant/brand.service';
import { BrandModel } from './../../../_models/brand.model';
import { LocationService } from './../../../_services/tenant/location.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LocationModel } from './../../../_models/location.model';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductPriceModel } from 'app/_models/product-price.model';
import { CustomValidators } from 'ng2-validation';
import { BrandItemsComponent } from '../_modals/brand-items/brand-items.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { TaxModel } from 'app/_models/tax.model';
import { TaxService } from 'app/_services/tax.service';
import { AttachmentModel } from "../../../_models/attachment.model";
import { PaymentMethodService } from 'app/_services/tenant/payment-method.service';
import { DeliveryPartnerModel } from 'app/_models/delivery-partners.model';
import { DeliveryPriceModel } from 'app/_models/delivery-price.model';
import { DepartmentService } from 'app/_services/department.service';
import { DepartmentModel } from 'app/_models/department.model';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  public pageLoader: boolean;
  public form: FormGroup;
  public loading: boolean = false;
  public recordId: number = null;
  public _location: LocationModel;
  public taxes: TaxModel[];
  public paymentMethods: PaymentMethodModel[];
  public deliveryPartners: DeliveryPartnerModel[];

  set location(value: LocationModel) {
    this._location = value;
    this.populate();
  }
  get location() {
    return this._location;
  }
  public taxTypes: any = [
    "InclusiveTax",
    "ExclusiveTax"
  ];
  public brands: BrandModel[];
  public departmentList: any;

  constructor(public fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    public locationService: LocationService,
    public brandService: BrandService,
    public productService: ProductService,
    public taxService: TaxService,
    public modalService: NgbModal,
    public paymentMethodService: PaymentMethodService,
    public translate: TranslateService,
    public departmentService: DepartmentService) {

    //Get ID from url
    if (this.router.url.indexOf('edit') != -1) {
      this.recordId = this.route.snapshot.params['id'];
      this.pageLoader = true;
    }

    this.brandService.getAllRecords().subscribe(result => {
      this.brands = result;
    });

    this.taxService.getAllRecords().subscribe(result => {
      this.taxes = result;
    });

    this.paymentMethodService.getAllRecordWithTrue().subscribe(result => {
      this.paymentMethods = result;
    })

    this.locationService.getDeliveryPartners().subscribe(result => {
      this.deliveryPartners = result;
    })

    this.departmentService.getAllDepartments().subscribe(result => {
      this.departmentList = result;
      console.log(this.departmentList)
    })

  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      description: [null],
      tax_type: [null, [Validators.required]],
      taxes: [null, []],
      payment_methods: [null, []],
      //brands: [],
      brand_locations: this.fb.array([]),
      is_twilio_required: [null],
      is_customer_required: [null],
      is_active: [null],
      is_otp_required: [null],
      attachment_id: [null],
      is_delivery: [null],
      delivery_partner: [null],
      location_delivery_prices: this.fb.array([]),
      departments: [null]

    });

    if (this.recordId) {
      let method = new FormControl("PUT", [Validators.required]);
      this.form.addControl('_method', method);

      this.locationService.get(this.recordId)
        .subscribe(
          result => {
            this.location = result;
          }
        );
    }
  }

  addBrandLocation(record: BrandLocationModel = null) {
    if (record === null) {
      record = new BrandLocationModel();
    }
    const records = this.form.get('brand_locations') as FormArray;

    const _record = this.fb.group({
      id: [record.id],
      brand_id: [record.brand_id, [Validators.required]],
      brand_menu_id: [record.brand_menu_id, [Validators.required]],
      products: this.fb.array([])
    });

    if (_record.value.brand_id !== null) {
      let products = null;

      if (record && record.brand_location_products)
        products = record.brand_location_products

      //this.addArrayForProduct(_record.value.brand_id, _record, products);
    }

    records.push(_record);
  }

  addArrayForProduct(brandId: number, brandLocationFormGroup: FormGroup, brandLocationProducts: BrandLocationProductModel[] = null) {
    const products = brandLocationFormGroup.get('products') as FormArray;

    this.productService.getProductsForBrand(brandId)
      .subscribe(
        result => {
          for (const _product of result) {
            let mainProductActive = false;

            const product = this.fb.group({
              product_id: [_product.id, [Validators.required]],
              portions: this.fb.array([]),
              name: [_product.name],
              is_active: [mainProductActive]
            });

            const portions = product.get('portions') as FormArray;
            for (const _portion of _product.product_portions) {
              let price = _portion.product_portion_price.price;
              let isActive = false;

              if (brandLocationProducts !== null) {
                const existingPortion = brandLocationProducts.find((item) => {
                  return item.product_id === _product.id && item.product_portion_id === _portion.id;
                });

                if (existingPortion) {
                  isActive = true;
                  price = existingPortion.price
                }

                if (isActive == true && mainProductActive === false)
                  mainProductActive = true;

              }

              portions.push(this.fb.group({
                name: [_portion.name],
                id: [_portion.id, [Validators.required]],
                price: [price, [Validators.required, CustomValidators.number]],
                is_active: [isActive]
              }));

              if (mainProductActive === true) {
                product.patchValue({
                  is_active: true
                });
              }
            }

            products.push(product);
          }
        }
      );

  }

  deleteBrand(index: number) {
    const records = this.form.get('brand_locations') as FormArray;
    records.removeAt(index);
  }

  onSubmit() {
    this.loading = true;
    this.locationService.store(this.form.value)
      .subscribe(
        result => {
          this.router.navigate(['tenant/locations']);
        },
        error => {
          this.loading = false;
        }
      );
  }

  onUpdate() {
    this.loading = true;

    this.locationService.update(this.form.value, this.recordId)
      .subscribe(
        result => {
          this.router.navigate(['tenant/locations']);
        },
        error => {
          this.loading = false;
        }
      );
  }

  populate() {
    this.form.patchValue({
      name: this.location.name,
      description: this.location.description,
      tax_type: this.location.tax_type,
      taxes: this.location.taxes,
      payment_methods: this.location.payment_methods,
      is_twilio_required: this.location.is_twilio_required,
      is_customer_required: this.location.is_customer_required,
      is_otp_required: this.location.is_otp_required,
      attactment_id: this.location.attactment_id,
      is_active: this.location.is_active,
      is_delivery: this.location.is_delivery,
      delivery_partner: this.location.delivery_partner,
      departments: this.location.departments

    });

    if (this.location && this.location.brands) {
      for (const brand of this.location.brands)
        this.addBrandLocation(brand);
    }

    if (this.location && this.location.delivery_prices) {
      for (const delivery_price of this.location.delivery_prices)
        this.addDeliveryPrice(delivery_price);
    }

    this.pageLoader = false;
  }

  getBrandMenus(brandId: number) {
    const brand = this.brands.find(item => item.id === brandId);
    return [...brand.brand_menus];
  }

  brandSelect(_index: number) {
    const brandLocationArray = this.form.get('brand_locations') as FormArray;
    const brandLocation = brandLocationArray.at(_index);

    // if (brandLocation.value.brand_id !== null) {
    //   this.addArrayForProduct(brandLocation.value.brand_id, <FormGroup>brandLocation);
    // }
  }

  openBrandItems(_index: number) {
    // const modalRef = this.modalService.open(BrandItemsComponent, { size: 'lg' }).componentInstance;
    // modalRef.form = this.form;
    // modalRef.index = _index;

    this.router.navigate(['tenant/locations/price/' + _index]);
  }

  getBrandName(id: number) {
    const brand = this.brands.find(item => item.id == id);
    return brand.name;
  }

  fileAdded(attachment: AttachmentModel) {
    this.form.patchValue({
      attachment_id: attachment.id
    });
  }

  deleteLocationPic() {
    this.form.patchValue({
      attachment_id: null
    })

    this.location.pic = null;
  }

  addDeliveryPrice(record: DeliveryPriceModel = null) {
    if (record === null) {
      record = new DeliveryPriceModel();
    }
    const records = this.form.get('location_delivery_prices') as FormArray;

    const _record = this.fb.group({
      id: [record.id],
      minimum_amount: [record.minimum_amount, [Validators.required]],
      maximum_amount: [record.maximum_amount, [Validators.required]],
      delivery_price: [record.delivery_price, [Validators.required]],

    });


    records.push(_record);
  }

  deleteDeliveryPrice(index: number) {
    const records = this.form.get('location_delivery_prices') as FormArray;
    records.removeAt(index);
  }
}

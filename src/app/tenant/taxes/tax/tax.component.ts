import { CategoryModel } from './../../../_models/category.model';
import { ProductModel } from './../../../_models/product.model';
import { CategoryService } from './../../../_services/tenant/category.service';
import { ProductService } from './../../../_services/tenant/product.service';
import { CustomValidators } from 'ng2-validation';
import { FormSnippet } from './../../../_snippets/form.snipppet';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TaxModel } from './../../../_models/tax.model';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TaxService } from 'app/_services/tax.service';
import { TranslateService } from '@ngx-translate/core';
import { TaxMapModel } from 'app/_models/tax-map.model';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent implements OnInit {
  public pageLoader: boolean;
  public form: FormGroup;
  public loading: boolean = false;
  public recordId: number = null;
  public _tax: TaxModel;
  public products: ProductModel[];
  public categories: CategoryModel[];
  public taxMaps: TaxMapModel[] = new Array();

  set tax(value: TaxModel) {
    this._tax = value;
    this.populate();
  }
  get tax() {
    return this._tax;
  }

  constructor(public fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    public taxService: TaxService,
    public productService: ProductService,
    public categoryService: CategoryService,
    public translate: TranslateService) {

    //Get ID from url
    if (this.router.url.indexOf('edit') != -1) {
      this.recordId = this.route.snapshot.params['id'];
      this.pageLoader = true;
    }

    //Get All Products
    this.productService.getAllRecords().subscribe(result => {
      this.products = result;
    });

    //Get All Cateogries
    this.categoryService.getAllRecords().subscribe(result => {
      this.categories = result;
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      description: [null],
      tax_percent: [0, [Validators.required, CustomValidators.number, CustomValidators.max(100), CustomValidators.min(0)]],
      tax_maps: this.fb.array([])
    });

    if (this.recordId) {
      let method = new FormControl("PUT", [Validators.required]);
      this.form.addControl('_method', method);

      this.taxService.get(this.recordId)
        .subscribe(
          result => {
            this.tax = result;
          }
        );
    }
  }

  onSubmit() {
    this.loading = true;

    this.taxService.store(this.form.value)
      .subscribe(
        result => {
          this.router.navigate(['tenant/taxes']);
        },
        error => {
          this.loading = false;
        }
      );
  }

  onUpdate() {
    this.loading = true;

    this.taxService.update(this.form.value, this.recordId)
      .subscribe(
        result => {
          this.router.navigate(['tenant/taxes']);
        },
        error => {
          this.loading = false;
        }
      );
  }

  populate() {
    for (const item of Object.getOwnPropertyNames(new TaxModel())) {
      FormSnippet.populateValueInForm(this.form, item, this.tax[item]);
    }

    if (this.tax.tax_maps && this.tax.tax_maps.length > 0) {
      for (const record of this.tax.tax_maps)
        this.addArrayForTaxMap(record);
    }

    this.pageLoader = false;
  }

  addArrayForTaxMap(taxMap: TaxMapModel = null) {
    if (taxMap === null)
      taxMap = new TaxMapModel();

    taxMap.products = new Array();
    this.taxMaps.push(taxMap);

    const records = this.form.get('tax_maps') as FormArray;

    if (taxMap.category_id !== null) {
      this.productService.getProductsForCategory(taxMap.category_id)
        .subscribe(
          result => {
            taxMap.products = [...result];
          }
        );
    }

    records.push(
      this.fb.group({
        id: [taxMap.id],
        product_id: [taxMap.product_id],
        category_id: [taxMap.category_id]
      })
    );
  }

  deleteTaxMap(_index: number) {
    const records = this.form.get("tax_maps") as FormArray;
    records.removeAt(_index);
  }

  getProducts(record: FormGroup, _index: number) {
    record.patchValue({
      product_id: null
    });
    this.productService.getProductsForCategory(record.value.category_id)
      .subscribe(
        result => {
          this.taxMaps[_index].products = [...result];
        }
      );
  }
}

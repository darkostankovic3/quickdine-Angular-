import { ProductUpSellModel } from './../../../_models/product-up-sell.model';
import { CategoryModel } from 'app/_models/category.model';
import { CategoryService } from 'app/_services/tenant/category.service';
import { ProductPortionModel } from './../../../_models/product-portion.model';
import { FormSnippet } from './../../../_snippets/form.snipppet';
import { ProductComboModel } from './../../../_models/product-combo.model';
import { CustomValidators } from 'ng2-validation';
import { BrandModel } from './../../../_models/brand.model';
import { BrandService } from './../../../_services/tenant/brand.service';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute } from "@angular/router";
import { ProductModel } from "app/_models/product.model";
import { ProductService } from "app/_services/tenant/product.service";
import { ProductComboService } from "app/_services/tenant/product-combo.service";
import { ProductComboItemModel } from "app/_models/product-combo-item.model";
import { ProductPortionPriceModel } from 'app/_models/product-portion-price.model';

@Component({
  selector: "app-product-combo",
  templateUrl: "./product-combo.component.html",
  styleUrls: ["./product-combo.component.scss"]
})
export class ProductComboComponent implements OnInit {
  public pageLoader: boolean;
  public form: FormGroup;
  public loading: boolean = false;
  public recordId: number = null;
  public _product: ProductModel;
  public products: ProductModel[];
  public brands: BrandModel[];
  public product: ProductModel;
  public categories: CategoryModel[];

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public productService: ProductService,
    public productComboService: ProductComboService,
    public translate: TranslateService,
    public brandService: BrandService,
    public route: ActivatedRoute,
    public categoryService: CategoryService) {
    this.brandService.getAllRecords()
      .subscribe(
        result => {
          this.brands = [...result];
        }
      );

    this.categoryService.getAllRecords().subscribe(result => {
      this.categories = result;
    });

    //Get ID from url
    if (this.router.url.indexOf("edit") != -1) {
      this.recordId = this.route.snapshot.params["id"];
      this.pageLoader = true;
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      combos: this.fb.array([]),
      brand_id: [null, [Validators.required]],
      portions: this.fb.array([]),
      category_id: [null],
      product_up_sells: this.fb.array([])
    });

    if (this.recordId) {
      let method = new FormControl("PUT", [Validators.required]);
      this.form.addControl("_method", method);

      this.productService.get(this.recordId).subscribe(result => {
        this.product = result;
        this.populate();
      });
    }
  }

  onSubmit() {
    this.loading = true;

    this.productService.store(this.form.value).subscribe(
      result => {
        this.router.navigate(["tenant/products"]);
      },
      error => {
        this.loading = false;
      }
    );
  }

  onUpdate() {
    this.loading = true;

    this.productService.update(this.form.value, this.recordId).subscribe(
      result => {
        this.router.navigate(["tenant/products"]);
      },
      error => {
        this.loading = false;
      }
    );
  }

  addArrayForUpsell(productUpSell: ProductUpSellModel = null) {
    if (productUpSell === null) {
      productUpSell = new ProductUpSellModel();
    }

    const records = this.form.get("product_up_sells") as FormArray;

    records.push(
      this.fb.group({
        id: [productUpSell.id],
        product_up_sell_id: [productUpSell.product_up_sell_id],
        price: [productUpSell.price]
      })
    );
  }

  addArrayForCombo(productCombo: ProductComboModel = null) {
    if (productCombo === null) {
      productCombo = new ProductComboModel();
    }

    const records = this.form.get("combos") as FormArray;
    const record = this.fb.group({
      combo_name: [productCombo.combo_name, [Validators.required]],
      minimum: [productCombo.minimum],
      maximum: [productCombo.maximum],
      combo_items: this.fb.array([])
    });

    if (productCombo.id === null) {
      this.addArrayForComboItem(record);
    } else if (productCombo.product_combo_items && productCombo.product_combo_items.length > 0) {
      for (const productComboItem of productCombo.product_combo_items) {
        this.addArrayForComboItem(record, productComboItem);
      }
    }

    records.push(record);
  }

  addArrayForPortion(productPortion: ProductPortionModel = null) {
    if (productPortion === null) {
      productPortion = new ProductPortionModel();
      productPortion.product_portion_price = new ProductPortionPriceModel();
    }

    const records = this.form.get("portions") as FormArray;

    if (this.form.value.portions.length === 0 && productPortion.name === null)
      productPortion.name = "Normal";

    records.push(
      this.fb.group({
        id: [productPortion.id],
        name: [productPortion.name, [Validators.required]],
        price: [productPortion.product_portion_price.price, [Validators.required, CustomValidators.number]],
        tag: [productPortion.product_portion_price.tag],
        product_portion_price_id: [productPortion.product_portion_price.id]
      })
    );
  }

  addArrayForComboItem(formGroup: FormGroup, comboItem: ProductComboItemModel = null) {
    if (!comboItem) {
      comboItem = new ProductComboItemModel();
    }
    const _items = formGroup.get('combo_items') as FormArray;
    _items.push(
      this.fb.group({
        id: [comboItem.id],
        product_id: [comboItem.product_id, [Validators.required, CustomValidators.number]],
        price: [comboItem.price, [Validators.required, CustomValidators.number]],
        quantity: [comboItem.quantity],
        auto_select: [comboItem.auto_select]
      })
    );
  }

  deleteCombo(_index: number) {
    const records = this.form.get("combos") as FormArray;
    records.removeAt(_index);
  }

  deleteComboItem(formGroup: FormGroup, _index: number) {
    const records = formGroup.get("combo_items") as FormArray;
    records.removeAt(_index);
  }

  getProducts() {
    if (this.form.value.brand_id) {
      this.productService.getProductsForBrand(this.form.value.brand_id)
        .subscribe(
          result => {
            this.products = [...result];
          }
        );
    } else {
      this.products = [...[]];
    }
  }

  deletePortion(_index: number) {
    const records = this.form.get("portions") as FormArray;
    records.removeAt(_index);
  }

  populate() {
    for (const item of Object.getOwnPropertyNames(new ProductModel())) {
      FormSnippet.populateValueInForm(this.form, item, this.product[item]);
      this.getProducts();
    }

    for (const productCombos of this.product.product_combos) {
      this.addArrayForCombo(productCombos);
    }

    for (const portion of this.product.product_portions) {
      this.addArrayForPortion(portion);
    }

    //Up Sells
    if (
      this.product.product_up_sells &&
      this.product.product_up_sells.length > 0
    ) {
      for (const record of this.product.product_up_sells)
        this.addArrayForUpsell(record);
    }
  }

  deleteUpSell(_index: number) {
    const records = this.form.get("product_up_sells") as FormArray;
    records.removeAt(_index);
  }
}

import { TranslateService } from "@ngx-translate/core";
import { ProductPortionPriceModel } from "./../../../_models/product-portion-price.model";
import { ProductPortionModel } from "./../../../_models/product-portion.model";
import { CustomValidators } from "ng2-validation";
import { FormSnippet } from "./../../../_snippets/form.snipppet";
import { BrandModel } from "./../../../_models/brand.model";
import { BrandService } from "./../../../_services/tenant/brand.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ProductModel } from "app/_models/product.model";
import { ProductUpSellModel } from "./../../../_models/product-up-sell.model";
import { ProductService } from "app/_services/tenant/product.service";
import { CategoryModel } from "app/_models/category.model";
import { CategoryService } from "app/_services/tenant/category.service";
import { AttachmentModel } from "../../../_models/attachment.model";
import { ProductDescriptionModel } from "app/_models/product-description.model";
import { LanguageService } from "app/_services/language.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  public pageLoader: boolean;
  public form: FormGroup;
  public languages;
  public loading: boolean = false;
  public recordId: number = null;

  public _product: ProductModel;
  set product(value: ProductModel) {
    this._product = value;
    this.populate();
  }
  get product() {
    return this._product;
  }
  public taxTypes: any = ["InclusiveTax", "ExclusiveTax"];
  public brands: BrandModel[];
  public products: ProductModel[];
  public categories: CategoryModel[];

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    public productService: ProductService,
    public brandService: BrandService,
    public categoryService: CategoryService,
    public translate: TranslateService,
    public languageService: LanguageService
  ) {
    //Get ID from url
    if (this.router.url.indexOf("edit") != -1) {
      this.recordId = this.route.snapshot.params["id"];
      this.pageLoader = true;
    }

    this.brandService.getAllRecords().subscribe((result) => {
      this.brands = result;
    });

    this.productService.getAllRecords().subscribe((result) => {
      this.products = result;
    });

    this.categoryService.getAllRecords().subscribe((result) => {
      this.categories = result;
    });

    this.languages = this.languageService.languages;
  }

  ngOnInit() {
    this.form = this.fb.group({
      //description: [null, [Validators.required]],
      brand_id: [null, [Validators.required]],
      category_id: [null],
      portions: this.fb.array([]),
      product_up_sells: this.fb.array([]),
      product_descriptions: this.fb.array([]),
      attachment_id: [null],
      is_enable: [null],
    });
    if (this.recordId) {
      let method = new FormControl("PUT", [Validators.required]);
      this.form.addControl("_method", method);

      this.productService.get(this.recordId).subscribe((result) => {
        this.product = result;
      });
    }
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
        price: [
          productPortion.product_portion_price.price,
          [Validators.required, CustomValidators.number],
        ],
        tag: [productPortion.product_portion_price.tag],
        product_portion_price_id: [productPortion.product_portion_price.id],
      })
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
        price: [productUpSell.price],
      })
    );
  }

  deletePortion(_index: number) {
    const records = this.form.get("portions") as FormArray;
    records.removeAt(_index);
  }

  deleteUpSell(_index: number) {
    const records = this.form.get("product_up_sells") as FormArray;
    records.removeAt(_index);
  }

  onSubmit() {
    this.loading = true;

    this.productService.store(this.form.value).subscribe(
      (result) => {
        this.router.navigate(["tenant/products"]);
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  onUpdate() {
    this.loading = true;

    this.productService.update(this.form.value, this.recordId).subscribe(
      (result) => {
        this.router.navigate(["tenant/products"]);
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  populate() {
    for (const item of Object.getOwnPropertyNames(new ProductModel())) {
      FormSnippet.populateValueInForm(this.form, item, this.product[item]);
    }

    //Portions
    if (
      this.product.product_portions &&
      this.product.product_portions.length > 0
    ) {
      for (const record of this.product.product_portions)
        this.addArrayForPortion(record);
    }

    //Up Sells
    if (
      this.product.product_up_sells &&
      this.product.product_up_sells.length > 0
    ) {
      for (const record of this.product.product_up_sells)
        this.addArrayForUpsell(record);
    }

    //Up Sells
    if (
      this.product.product_descriptions &&
      this.product.product_descriptions.length > 0
    ) {
      for (const record of this.product.product_descriptions)
        this.addArrayForProductDescription(record);
    }

    //Translations
    {
      if (this.product.translations && this.product.translations.length > 0) {
        for (const name of this.product.translations)
          this.addArrayForProductName(name);
      }
    }

    this.pageLoader = false;
  }

  getBrandMenus(brandId: number) {
    const brand = this.brands.find((item) => item.id === brandId);
    return [...brand.brand_menus];
  }

  fileAdded(attachment: AttachmentModel) {
    this.form.patchValue({
      attachment_id: attachment.id,
    });
  }

  addArrayForProductDescription(record: ProductDescriptionModel = null) {
    if (!record) {
      record = new ProductDescriptionModel();
    }

    const records = this.form.get("product_descriptions") as FormArray;
    records.push(
      this.fb.group({
        id: [record.id],
        language: [record.language, [Validators.required]],
        name: [record.name, [Validators.required]],
        description: [record.description, []],
      })
    );
  }

  addArrayForProductName(translation: any) {
    const index = this.form.value.product_descriptions.findIndex(
      (item) => item.language === translation.locale
    );
    const records = this.form.get("product_descriptions") as FormArray;

    if (index > -1) {
      const record = records.at(index);
      record.patchValue({
        name: translation.name,
      });
    } else {
      records.push(
        this.fb.group({
          id: [null],
          language: [translation.locale, [Validators.required]],
          name: [translation.name, [Validators.required]],
          description: [null, []],
        })
      );
    }
    // if (!record) {
    //   record = new ProductDescriptionModel();
    // }

    // const records = this.form.get('product_descriptions') as FormArray;
    // records.push(
    //   this.fb.group({
    //     id: [record.id],
    //     language: [record.language, [Validators.required]],
    //     name: [record.name, [Validators.required]],
    //     description: [record.description, [Validators.required]]
    //   })
    // );
  }

  deleteLanguage(_index: number) {
    const records = this.form.get("product_descriptions") as FormArray;
    records.removeAt(_index);
  }
}

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
  FormArray
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ProductUpSellModel } from "./../../../_models/product-up-sell.model";
import { ProductService } from "app/_services/tenant/product.service";
import { CategoryModel } from "app/_models/category.model";
import { CategoryService } from "app/_services/tenant/category.service";
import { TagModel } from "app/_models/tag.model";
import { ProductModel } from "app/_models/product.model";
import { TagService } from "app/_services/tenant/tag.service";
import { TagItemModel } from "app/_models/tag-item.model";
import { TagMapModel } from "app/_models/tag-map.model";

@Component({
  selector: "app-tag",
  templateUrl: "./tag.component.html",
  styleUrls: ["./tag.component.scss"]
})
export class TagComponent implements OnInit {
  public pageLoader: boolean;
  public form: FormGroup;
  public loading: boolean = false;
  public recordId: number = null;
  public tagMaps: TagMapModel[] = new Array;

  public _tag: TagModel;
  set tag(value: TagModel) {
    this._tag = value;
    this.populate();
  }
  get tag() {
    return this._tag;
  }

  public brands: BrandModel[];
  public products: ProductModel[];
  public categories: CategoryModel[];

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    public productService: ProductService,
    public tagService: TagService,
    public brandService: BrandService,
    public categoryService: CategoryService,
    public translate: TranslateService
  ) {
    //Get ID from url
    if (this.router.url.indexOf("edit") != -1) {
      this.recordId = this.route.snapshot.params["id"];
      this.pageLoader = true;
    }

    this.brandService.getAllRecords().subscribe(result => {
      this.brands = result;
    });

    this.categoryService.getAllRecords().subscribe(result => {
      this.categories = result;
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      brand_id: [null, [Validators.required]],
      category_id: [null],
      min_select: [0],
      max_select: [0],
      is_free_tag: [false],
      is_add_tag_price_to_order: [false],
      is_save_free_tag: [false],
      is_tax_free: [false],
      tag_items: this.fb.array([]),
      tag_maps: this.fb.array([])
    });

    if (this.recordId) {
      let method = new FormControl("PUT", [Validators.required]);
      this.form.addControl("_method", method);

      this.tagService.get(this.recordId).subscribe(result => {
        this.tag = result;
      });
    }
  }

  addArrayForTagItem(tagItem: TagItemModel = null) {
    if (tagItem === null) {
      tagItem = new TagItemModel();
    }

    const records = this.form.get("tag_items") as FormArray;

    records.push(
      this.fb.group({
        id: [tagItem.id],
        name: [tagItem.name],
        price: [tagItem.price],
        quantity: [tagItem.quantity],
        product_id: [tagItem.product_id, []]
      })
    );
  }

  addArrayForTagMap(tagMap: TagMapModel = null) {
    if (tagMap === null) {
      tagMap = new TagMapModel();
    }

    tagMap.products = new Array();
    this.tagMaps.push(tagMap);

    const records = this.form.get("tag_maps") as FormArray;

    if (tagMap.category_id !== null) {
      this.productService.getProductsForCategory(tagMap.category_id)
        .subscribe(
          result => {
            tagMap.products = [...result];
          }
        );
    }

    records.push(
      this.fb.group({
        id: [tagMap.id],
        product_id: [tagMap.product_id],
        category_id: [tagMap.category_id, []]
      })
    );
  }

  deleteTagItems(_index: number) {
    const records = this.form.get("tag_items") as FormArray;
    records.removeAt(_index);
  }

  deleteTagMap(_index: number) {
    const records = this.form.get("tag_maps") as FormArray;
    records.removeAt(_index);
  }

  onSubmit() {
    this.loading = true;

    this.tagService.store(this.form.value).subscribe(
      result => {
        this.router.navigate(["tenant/tags"]);
      },
      error => {
        this.loading = false;
      }
    );
  }

  onUpdate() {
    this.loading = true;

    this.tagService.update(this.form.value, this.recordId).subscribe(
      result => {
        this.router.navigate(["tenant/tags"]);
      },
      error => {
        this.loading = false;
      }
    );
  }

  populate() {
    for (const item of Object.getOwnPropertyNames(new TagModel())) {
      FormSnippet.populateValueInForm(this.form, item, this.tag[item]);
    }

    //Tag Item
    if (this.tag.tag_items && this.tag.tag_items.length > 0) {
      for (const record of this.tag.tag_items) this.addArrayForTagItem(record);
    }

    //Tag Maps
    if (this.tag.tag_maps && this.tag.tag_maps.length > 0) {
      for (const record of this.tag.tag_maps) this.addArrayForTagMap(record);
    }

    this.pageLoader = false;
  }

  getProducts() {
    this.productService.getProductsForBrand(this.form.value.brand_id)
      .subscribe(
        result => {
          this.products = [...result];
        }
      );
  }

  getProductsForCategory(record: FormGroup, _index: number) {
    record.patchValue({
      product_id: null
    });

    if (record.value.category_id !== null) {
      this.productService.getProductsForCategory(record.value.category_id)
        .subscribe(
          result => {
            this.tagMaps[_index].products = [...result];
          }
        );
    }
  }
}

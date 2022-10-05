import { MenuDescriptionModel } from './../../../_models/menu-description.model';
import { CustomValidators } from 'ng2-validation';
import { MenuService } from './../../../_services/menu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuModel } from './../../../_models/menu.model';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProductModel } from 'app/_models/product.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public pageLoader: boolean;
  public form: FormGroup;
  public loading: boolean = false;
  public recordId: number = null;
  public _category: MenuModel;
  set category(value: MenuModel) {
    this._category = value;
  }
  get category() {
    return this._category;
  }
  @Output() recordAdded = new EventEmitter<any>();

  public _parentId: number = null;
  @Input('parentId')
  set parentId(value: number) {
    this._parentId = value;
  }

  get parentId() {
    return this._parentId;
  }

  private _brandMenuId: number;
  @Input('brandMenuId')
  set brandMenuId(value: number) {
    this._brandMenuId = value;
  }

  get brandMenuId() {
    return this._brandMenuId;
  }
  public languages: any = [
    "English",
    "Spanish",
    "Arabic"
  ];

  public _products: ProductModel[];
  @Input('products')
  set products(value: ProductModel[]) {
    this._products = [...value];
  }

  get products() {
    return this._products;
  }

  constructor(public fb: FormBuilder,
    public router: Router,
    public menuService: MenuService,
    public translate: TranslateService) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      parent_id: [this.parentId],
      brand_menu: this.fb.group({
        id: [this.brandMenuId, [Validators.required]]
      }),
      menu_descriptions: this.fb.array([])
    });

    if (this.parentId !== null) {
      let price = new FormControl(null, [Validators.required, CustomValidators.number, CustomValidators.min(0.01)]);
      this.form.addControl('price', price);
    }
  }

  addArrayForMenuDescription(record: MenuDescriptionModel = null) {
    if (!record) {
      record = new MenuDescriptionModel();
    }

    const records = this.form.get('menu_descriptions') as FormArray;
    records.push(this.fb.group({
      id: [record.id],
      language: [record.language, [Validators.required]],
      description: [record.description, [Validators.required]]
    }));
  }

  onSubmit() {
    this.loading = true;

    this.menuService.store(this.form.value)
      .subscribe(
        result => {
          this.form.reset();
          this.form.patchValue({
            parent_id: this.parentId
          });

          this.form.get('brand_menu').patchValue({
            id: this.brandMenuId
          });

          this.recordAdded.emit(result);
          this.loading = false;
        },
        error => {
          this.loading = false;
        }
      );
  }

  deleteLanguage(_index: number) {
    const records = this.form.get('menu_descriptions') as FormArray;
    records.removeAt(_index);
  }
}

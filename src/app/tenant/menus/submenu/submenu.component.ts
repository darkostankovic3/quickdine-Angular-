import { Validators } from "@angular/forms";
import { LanguageService } from "./../../../_services/language.service";
import { TaxModel } from "app/_models/tax.model";
import { TaxService } from "app/_services/tax.service";
import { forkJoin } from "rxjs/observable/forkJoin";
import { MenuService } from "./../../../_services/menu.service";
import { Router } from "@angular/router";
import { MenuModel } from "./../../../_models/menu.model";
import { FormGroup, FormBuilder, FormArray, FormControl } from "@angular/forms";
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
} from "@angular/core";
import { MenuDescriptionModel } from "app/_models/menu-description.model";
import { ToastrService } from "ngx-toastr";
import { ProductModel } from "app/_models/product.model";
import { NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { NouiFormatter } from "ng2-nouislider";
import { DecimalPipe } from "@angular/common";
import { BrandMenuItemModel } from "app/_models/brand-menu-item.model";
import { TranslateService } from "@ngx-translate/core";
import { SubCategoryService } from "app/_services/tenant/sub-category.service";

export class TimeFormatter implements NouiFormatter {
  public youtube: string =
    "/^(?:https?://)?(?:m.|www.)?(?:youtu.be/|youtube.com/(?:embed/|v/|watch?v=|watch?.+&v=))((w|-){11})(?:S+)?$/;";
  constructor(private decimalPipe: DecimalPipe) {}

  to(value: number): string {
    let h = Math.floor(value / 60);
    let m = value % 60;
    let output =
      this.decimalPipe.transform(h, "2.0") +
      ":" +
      this.decimalPipe.transform(m, "2.0");
    return output;
  }

  from(value: string): number {
    return Number(value.split(":")[0]) * 60 + Number(value.split(":")[1]);
  }
}

@Component({
  selector: "app-submenu",
  templateUrl: "./submenu.component.html",
  styleUrls: ["./submenu.component.scss"],
})
export class SubmenuComponent implements OnInit {
  public pageLoader: boolean;
  public form: FormGroup;
  public loading: boolean = false;
  public recordId: number = null;
  public _menu: MenuModel;
  @Input("menu")
  set menu(value: MenuModel) {
    this._menu = value;
  }
  get menu() {
    return this._menu;
  }
  @Output() recordAdded = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  public taxes: TaxModel[];
  private _brandMenuId: number;
  @Input("brandMenuId")
  set brandMenuId(value: number) {
    this._brandMenuId = value;
  }

  get brandMenuId() {
    return this._brandMenuId;
  }

  private _parentId: number;
  @Input("parentId")
  set parentId(value: number) {
    this._parentId = value;
  }

  get parentId() {
    return this._parentId;
  }

  public _products: ProductModel[];
  @Input("products")
  set products(value: ProductModel[]) {
    this._products = [...value];
  }

  get products() {
    return this._products;
  }

  public languages;
  public val1: number[] = [1200];
  public date: { year: number; month: number };
  public checked: boolean = false;
  public rangeValues;
  public selectedDays: any = [];
  public someKeyboardConfig: any = null;
  public selectedItemType: any = [];
  public itemTypes = [
    { name: "Hot", image: "./../../../../assets/img/pages/hot-icon.png" },
    {
      name: "Vegan",
      image: "./../../../../assets/img/pages/vegan-icon-17.png",
    },
    {
      name: "Vegetarian",
      image: "./../../../../assets/img/pages/vegan-icon.png",
    },
    {
      name: "GlutenFee",
      image: "./../../../../assets/img/pages/gluten-free.png",
    },
    { name: "Halal", image: "./../../../../assets/img/pages/halal-icon.png" },
    {
      name: "BestSeller",
      image: "./../../../../assets/img/pages/best-seller.png",
    },
    {
      name: "HotPromotion",
      image: "./../../../../assets/img/pages/hot-icon.png",
    },
  ];

  constructor(
    public fb: FormBuilder,
    private decimalPipe: DecimalPipe,
    public router: Router,
    public menuService: MenuService,
    public taxService: TaxService,
    private calendar: NgbCalendar,
    private toastr: ToastrService,
    public translate: TranslateService,
    public languageService: LanguageService,
    public subCategoryService: SubCategoryService
  ) {
    forkJoin([taxService.getAllRecords()]).subscribe((result) => {
      this.taxes = [...result["0"]];
    });

    this.languages = this.languageService.languages;
  }

  ngOnInit() {
    if (!this.menu) {
      this.menu = new MenuModel();
      this.menu.brand_menu_items = new Array();
      this.menu.brand_menu_items.push(new BrandMenuItemModel());
    }

    if (this.menu.show_only_from_days !== null)
      this.selectedDays = this.menu.show_only_from_days;
    else this.selectedDays = [];

    if (this.menu.show_only_from_range !== null)
      this.rangeValues = this.menu.show_only;
    else this.rangeValues = [0, 1440];

    this.someKeyboardConfig = {
      connect: true,
      start: [...this.rangeValues],
      step: 10,
      tooltips: [
        new TimeFormatter(this.decimalPipe),
        new TimeFormatter(this.decimalPipe),
      ],
      range: {
        min: 0,
        max: 1440,
      },
      behaviour: "drag",
    };

    this.selectedItemType = this.menu.type;

    this.form = this.fb.group({
      id: [this.menu.id],
      product_id: [this.menu.product_id, [Validators.required]],
      name: [this.menu.name, []],
      parent_id: [this.parentId],
      type: [this.menu.type],
      sub_category: [this.menu.sub_category],
      youtube_link: [
        this.menu.youtube_link,
        Validators.pattern(
          /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
        ),
      ],
      brand_menu: this.fb.group({
        id: [this.brandMenuId, [Validators.required]],
        taxes: [this.menu.taxes, []],
        visibility: [this.menu.visibility, []],
        hide_until: this.fb.group({
          date: [this.menu.hide_until_date],
          time: [this.menu.hide_until_time],
        }),
        show_only_from: this.fb.group({
          range: [this.rangeValues],
          days: [this.selectedDays],
        }),
      }),
      menu_descriptions: this.fb.array([]),
    });

    if (this.menu && this.menu.id) {
      let method = new FormControl("PUT", [Validators.required]);
      this.form.addControl("_method", method);
    }

    if (this.menu && this.menu.menu_descriptions) {
      for (const record of this.menu.menu_descriptions) {
        this.addArrayForMenuDescription(record);
      }
    }
  }

  onSubmit() {
    this.loading = true;

    this.menuService.store(this.form.value).subscribe(
      (result) => {
        if (this.menu.sub_category !== this.form.value.sub_category) {
          this.subCategoryService.getSubcategories();
        }

        this.recordAdded.emit(result);

        //Reset form form for new record
        if (this.menu.id === null) {
          this.form.reset();
          this.form.patchValue({
            parent_id: this.parentId,
          });
          this.form.get("brand_menu").patchValue({
            id: this.brandMenuId,
          });
        }

        this.loading = false;
        this.toastr.success("Stored successfully.", "Success");
        this.cancel.emit();
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  onUpdate() {
    this.loading = true;

    this.menuService.update(this.menu.id, this.form.value).subscribe(
      (result) => {
        if (this.menu.sub_category !== this.form.value.sub_category) {
          this.subCategoryService.getSubcategories();
        }

        this.menu.name = result.name;
        this.menu.youtube_link = result.youtube_link;
        this.menu.taxes = result.taxes;
        this.menu.visibility = result.visibility;
        this.menu.type = result.type;
        this.menu.hide_until_date = result.hide_until_date;
        this.menu.hide_until_time = result.hide_until_time;
        this.menu.hide_until_time = result.hide_until_time;
        this.menu.show_only = result.show_only;
        this.menu.show_only_from_days = result.show_only_from_days;
        this.menu.sub_category = result.sub_category;

        this.recordAdded.emit(result);
        this.loading = false;
        this.toastr.success("Updated successfully.", "Success");
        this.cancel.emit();
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  addArrayForMenuDescription(record: MenuDescriptionModel = null) {
    if (!record) {
      record = new MenuDescriptionModel();
    }

    const records = this.form.get("menu_descriptions") as FormArray;
    records.push(
      this.fb.group({
        id: [record.id],
        language: [record.language, [Validators.required]],
        description: [record.description, [Validators.required]],
      })
    );
  }

  deleteLanguage(_index: number) {
    const records = this.form.get("menu_descriptions") as FormArray;
    records.removeAt(_index);
  }

  validateForm() {
    if (this.form.invalid || this.loading) return true;

    if (this.form.value.brand_menu.visibility === null) {
      return false;
    } else {
      if (this.form.value.brand_menu.visibility === "HideUntil") {
        if (
          this.form.value.brand_menu.hide_until.date === null ||
          this.form.value.brand_menu.hide_until.time === null
        ) {
          return true;
        }
        return false;
      } else if (this.form.value.brand_menu.visibility === "ShowOnlyFrom") {
        if (
          this.form.value.brand_menu.show_only_from.range === null ||
          this.form.value.brand_menu.show_only_from.days === null
        ) {
          return true;
        }
      }
    }
    return false;
  }
}

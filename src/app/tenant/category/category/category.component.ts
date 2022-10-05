import { BrandService } from './../../../_services/tenant/brand.service';
import { BrandModel } from './../../../_models/brand.model';
import { FormSnippet } from "../../../_snippets/form.snipppet";
import { CategoryService } from "../../../_services/tenant/category.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CategoryModel } from "../../../_models/category.model";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AttachmentModel } from 'app/_models/attachment.model';

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"]
})
export class CategoryComponent implements OnInit {
  public pageLoader: boolean;
  public form: FormGroup;
  public loading: boolean = false;
  public recordId: number = null;
  public _category: CategoryModel;

  set category(value: CategoryModel) {
    this._category = value;
    this.populate();
  }
  get category() {
    return this._category;
  }

  public brands: BrandModel[];

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    public categoryService: CategoryService,
    public translate: TranslateService,
    public brandService: BrandService,
  ) {
    //Get ID from url
    if (this.router.url.indexOf("edit") != -1) {
      this.recordId = this.route.snapshot.params["id"];
      this.pageLoader = true;
    }

    this.brandService.getAllRecords().subscribe(result => {
      this.brands = result;
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      brand_id: [null, [Validators.required]],
      attachment_id: [null]
    });

    if (this.recordId) {
      let method = new FormControl("PUT", [Validators.required]);
      this.form.addControl("_method", method);

      this.categoryService.get(this.recordId).subscribe(result => {
        this.category = result;
      });
    }
  }

  onSubmit() {
    this.loading = true;

    this.categoryService.store(this.form.value).subscribe(
      result => {
        this.router.navigate(["tenant/category"]);
      },
      error => {
        this.loading = false;
      }
    );
  }

  onUpdate() {
    this.loading = true;

    this.categoryService.update(this.form.value, this.recordId).subscribe(
      result => {
        this.router.navigate(["tenant/category"]);
      },
      error => {
        this.loading = false;
      }
    );
  }

  populate() {
    for (const item of Object.getOwnPropertyNames(new CategoryModel())) {
      FormSnippet.populateValueInForm(this.form, item, this.category[item]);
    }

    this.pageLoader = false;
  }

  fileAdded(attachment: AttachmentModel) {
    this.form.patchValue({
      attachment_id: attachment.id
    });
  }

  deleteCategoryPic() {
    this.form.patchValue({
      attachment_id: null
    })

    this.category.pic = null;
  }
}

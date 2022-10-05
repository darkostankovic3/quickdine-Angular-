import { Component, OnInit } from '@angular/core';
import { AttachmentModel } from './../../../_models/attachment.model';
import { BrandMenuModel } from './../../../_models/brand-menu.model';
import { BrandMenuService } from './../../../_services/tenant/brand-menu.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BrandModel } from './../../../_models/brand.model';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { BrandService } from './../../../_services/tenant/brand.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormSnippet } from 'app/_snippets/form.snipppet';

@Component({
  selector: 'app-brand-menu',
  templateUrl: './brand-menu.component.html',
  styleUrls: ['./brand-menu.component.scss']
})
export class BrandMenuComponent implements OnInit {

  public brands: BrandModel[];
  public brandMenus: BrandMenuModel[];
  public brandMenu: BrandMenuModel;
  public form: FormGroup;
  public loading: boolean;
  public recordId: number;

  constructor(public brandService: BrandService,
    public brandMenuService: BrandMenuService,
    public translate: TranslateService,
    public fb: FormBuilder,
    public router: Router,
    public route: ActivatedRoute
  ) {
    forkJoin([brandService.getAllRecords(), brandMenuService.getAllRecords()])
      .subscribe(
        result => {
          this.brands = [...result["0"]];
          //this.brandMenus = [...result["1"]];
        }
      );

    //Get ID from url
    if (this.router.url.indexOf("brand-menu") != -1) {
      this.recordId = this.route.snapshot.params["id"];
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      brand_id: [null, [Validators.required]],
      type: ['CreateNewMenu', [Validators.required]],
      brand_menu: [null],
      attachment_id: [null],
      logo_attachment_id: [null]
    });

    if (this.recordId) {
      let method = new FormControl("PUT", [Validators.required]);
      this.form.addControl('_method', method);

      this.brandMenuService.get(this.recordId).subscribe(result => {
        this.brandMenu = result;
        this.populate();
      });
    }
  }

  onSubmit() {
    this.loading = true;

    this.brandMenuService.store(this.form.value)
      .subscribe(
        result => {
          this.router.navigate(['tenant/menu/edit/' + result.id]);
          this.loading = false;
        },
        error => {
          this.loading = false;
        }
      );
  }

  onUpdate() {
    this.loading = true;

    this.brandMenuService.update(this.form.value, this.recordId)
      .subscribe(
        result => {
          this.router.navigate(['tenant/menu/edit/' + result.id]);
          this.loading = false;
        },
        error => {
          this.loading = false;
        }
      );
  }

  menuTypeChanged() {
    const type = this.form.value.value;

    if (type === "CreateNewMenu") {
      this.form.get('brand_menu').setValidators([null]);
    } else if ("CloneExistingMenu") {
      this.form.get('brand_menu').setValidators([Validators.required]);
    }
  }

  getMenus() {
    this.form.patchValue({
      brand_menu: [null]
    });
    if (this.form.value.brand_id) {
      this.brandService.getBrandMenusForBrand(this.form.value.brand_id)
        .subscribe(
          result => {
            this.brandMenus = [...result];
          }
        );
    } else {
      this.brandMenus = [...[]];
    }
  }

  fileAdded(attachment: AttachmentModel) {
    this.form.patchValue({
      attachment_id: attachment.id
    });
  }

  logoFilesAdded(attachment: AttachmentModel) {
    this.form.patchValue({
      logo_attachment_id: attachment.id
    });
  }

  populate() {
    for (const item of Object.getOwnPropertyNames(new BrandMenuModel())) {
      FormSnippet.populateValueInForm(this.form, item, this.brandMenu[item]);
    }
  }
}

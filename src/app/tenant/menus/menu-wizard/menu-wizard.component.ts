import { AttachmentModel } from './../../../_models/attachment.model';
import { BrandMenuModel } from './../../../_models/brand-menu.model';
import { BrandMenuService } from './../../../_services/tenant/brand-menu.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrandModel } from './../../../_models/brand.model';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { BrandService } from './../../../_services/tenant/brand.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu-wizard',
  templateUrl: './menu-wizard.component.html',
  styleUrls: ['./menu-wizard.component.scss']
})
export class MenuWizardComponent implements OnInit {
  public brands: BrandModel[];
  public brandMenus: BrandMenuModel[];
  public form: FormGroup;
  public loading: boolean;

  constructor(public brandService: BrandService,
    public brandMenuService: BrandMenuService,
    public translate: TranslateService,
    public fb: FormBuilder,
    public router: Router) {
    forkJoin([brandService.getAllRecords(), brandMenuService.getAllRecords()])
      .subscribe(
        result => {
          this.brands = [...result["0"]];
          //this.brandMenus = [...result["1"]];
        }
      );
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      brand_id: [null, [Validators.required]],
      type: [null, [Validators.required]],
      brand_menu: [null],
      attachment_id: [null]
    });
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
}

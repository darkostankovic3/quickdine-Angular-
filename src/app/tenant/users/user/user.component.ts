import { CustomValidators } from 'ng2-validation';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TenantUsersService } from 'app/_services/tenant/tenant-users.service';
import { TenantModel } from './../../../_models/tenant.model';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { BrandService } from './../../../_services/tenant/brand.service';
import { BrandMenuModel } from './../../../_models/brand-menu.model';
import { BrandMenuService } from './../../../_services/tenant/brand-menu.service';
import { BrandModel } from './../../../_models/brand.model';
import { FormSnippet } from 'app/_snippets/form.snipppet';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public userType: string = null;
  public form: FormGroup;
  public loading: boolean = false;
  public pageLoader: boolean;
  public brandMenu: BrandMenuModel;
  public brandMenus: BrandMenuModel[];
  public brands: BrandModel[];
  public recordId: number;
  public route: ActivatedRoute;

  // public brands = [
  //   {
  //     brand: 'quickdine',
  //     id: 1
  //   },
  //   {
  //     brand: 'Qr',
  //     id: 2
  //   }
  // ];

  public _tenant: TenantModel;
  set tenant(value: TenantModel) {
    this._tenant = value;
  }
  get tenant() {
    return this._tenant;
  }

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public tenantUserService: TenantUsersService,
    public brandService: BrandService,
    public brandMenuService: BrandMenuService
  ) {
    forkJoin([
      brandService.getAllRecords(),
      brandMenuService.getAllRecords()
    ]).subscribe(result => {
      this.brands = [...result['0']];
    });

    //Get ID from url
    if (this.router.url.indexOf('brand-menu') != -1) {
      this.recordId = this.route.snapshot.params['id'];
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, CustomValidators.email]],
      password: [null, [Validators.required]],
      brands: [null, [Validators.required]]
    });

    if (this.recordId) {
      let method = new FormControl('PUT', [Validators.required]);
      this.form.addControl('_method', method);

      this.brandMenuService.get(this.recordId).subscribe(result => {
        this.brandMenu = result;
        this.populate();
      });
    }
  }

  onSubmit() {
    this.loading = true;

    this.tenantUserService.store(this.form.value).subscribe(
      result => {
        this.router.navigate(['tenant/users']);
      },
      error => {
        this.loading = false;
      }
    );
  }

  getMenus() {
    this.form.patchValue({
      brand_menu: [null]
    });
    if (this.form.value.brand_id) {
      this.brandService
        .getBrandMenusForBrand(this.form.value.brand_id)
        .subscribe(result => {
          this.brandMenus = [...result];
        });
    } else {
      this.brandMenus = [...[]];
    }
  }

  populate() {
    for (const item of Object.getOwnPropertyNames(new BrandMenuModel())) {
      FormSnippet.populateValueInForm(this.form, item, this.brandMenu[item]);
    }
  }
}

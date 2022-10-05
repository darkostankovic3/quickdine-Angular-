import { CountryModel } from './../../../_models/country.model';
import { CountryService } from './../../../_services/admin/country.service';
import { UserModel } from './../../../_models/user.model';
import { CustomValidators } from 'ng2-validation';
import { TenantService } from 'app/_services/tenant.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TenantModel } from './../../../_models/tenant.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/_services/user.service';
import { forkJoin } from "rxjs/observable/forkJoin";

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent implements OnInit {
  public pageLoader: boolean;
  public form: FormGroup;
  public loading: boolean = false;
  public tenantId: number = null;
  public status: any = [
    { id: 'Active', text: 'Active' },
    { id: 'InActive', text: 'In-Active' },
    { id: 'Processing', text: 'Processing' }
  ];
  public languages = [
    { language: 'Bahasa Indonesia', symbol: 'id', flag: './assets/img/flags/in.png', direction: "ltr" },
    { language: 'Bahasa Melayu', symbol: 'ms', flag: './assets/img/flags/ms.png', direction: "ltr" },
    { language: 'English', symbol: 'en', flag: './assets/img/flags/en.png', direction: "ltr" },
    { language: 'German', symbol: 'de', flag: './assets/img/flags/de.png', direction: "ltr" },
    { language: 'Norsk Bokmål', symbol: 'bg', flag: './assets/img/flags/bg.png', direction: "ltr" },
    { language: 'Arabic', symbol: 'ar', flag: './assets/img/flags/ar.png', direction: "rtl" },
    { language: 'हिंदी', symbol: 'hi-IN', flag: './assets/img/flags/hi-IN.png', direction: "ltr" },
    { language: 'தமிழ்', symbol: 'ta-IN', flag: './assets/img/flags/hi-IN.png', direction: "ltr" },
    { language: 'ภาษาไทย', symbol: 'th', flag: './assets/img/flags/th.png', direction: "ltr" },
    { language: '简体中文', symbol: 'zh-CN', flag: './assets/img/flags/zh-CN.png', direction: "ltr" },
    { language: 'Spanish', symbol: 'es', flag: './assets/img/flags/es.png', direction: "ltr" },
    { language: 'Portuguese', symbol: 'pt', flag: './assets/img/flags/pt.png', direction: "ltr" }
  ];
  public users: UserModel[];
  public countries: CountryModel[];

  public _tenant: TenantModel;
  set tenant(value: TenantModel) {
    this._tenant = value;
    this.populate();
  }
  get tenant() {
    return this._tenant;
  }

  constructor(public fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    public tenantService: TenantService,
    public userService: UserService,
    public countryService: CountryService) {

    //Get ID from url
    if (this.router.url.indexOf('edit') != -1) {
      this.tenantId = this.route.snapshot.params['id'];
      this.pageLoader = true;
    }

    forkJoin([userService.tenantUsers(), countryService.getAllRecords()])
      .subscribe(
        result => {
          this.users = result["0"];
          this.countries = result["1"];
        }
      );
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      hostname: [null, [Validators.required]],
      user_id: [null, [Validators.required]],
      status: ["Active", [Validators.required]],
      country_id: [null, [Validators.required]],
      default_language: [null],
      languages: [null, [Validators.required]]
    });

    if (this.tenantId) {
      let method = new FormControl("PUT", [Validators.required]);
      this.form.addControl('_method', method);

      this.tenantService.get(this.tenantId)
        .subscribe(
          result => {
            this.tenant = result;
          }
        );
    }
  }

  onSubmit() {
    this.loading = true;

    this.tenantService.store(this.form.value)
      .subscribe(
        result => {
          this.router.navigate(['admin/tenants']);
        },
        error => {
          this.loading = false;
        }
      );
  }

  onUpdate() {
    this.loading = true;

    this.tenantService.update(this.form.value, this.tenantId)
      .subscribe(
        result => {
          this.router.navigate(['admin/tenants']);
        },
        error => {
          this.loading = false;
        }
      );
  }

  populate() {
    this.form.patchValue({
      name: this.tenant.name,
      hostname: this.tenant.hostname,
      user_id: this.tenant.user_id,
      status: this.tenant.status,
      country_id: this.tenant.country_id,
      default_language: this.tenant.default_language,
      languages: this.tenant.languages
    });
    this.pageLoader = false;
  }
}

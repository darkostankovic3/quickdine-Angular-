import { TranslateService } from '@ngx-translate/core';
import { SettingService } from './../../../_services/tenant/setting.service';
import { DashboardInterface } from './../../../_interfaces/dashboard.interface';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { LocationService } from 'app/_services/tenant/location.service';
import { BrandService } from './../../../_services/tenant/brand.service';
import { HttpClient } from '@angular/common/http';
import { LocationModel } from 'app/_models/location.model';
import { BrandModel } from './../../../_models/brand.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public form: FormGroup;
  public brands: BrandModel[] = [];
  public allLocations: LocationModel[] = [];
  public locations: LocationModel[] = [];
  public stats: DashboardInterface = {
    orders: 0,
    sales: 0,
    customers: 0
  };
  public today;

  constructor(public http: HttpClient,
    public fb: FormBuilder,
    public brandService: BrandService,
    public locationService: LocationService,
    public settingService: SettingService,
    public translate: TranslateService) {
    forkJoin([brandService.getAllRecords(), locationService.getAllRecords()])
      .subscribe(
        result => {
          this.brands = [...result["0"]];
          this.locations = [...result["1"]];
          this.allLocations = [...result["1"]];
        }
      );

    this.today = (new Date().getFullYear()) + "-" + ((new Date().getMonth()) + 1) + "-" + (new Date().getDate());
  }

  ngOnInit() {
    this.form = this.fb.group({
      brand: [null],
      location: [null],
      date_range: [this.today + "-" + this.today]
    });

    this.onSubmit();
  }

  brandSelected() {
    if (this.form.value.brand !== null && this.form.value.brand.length > 0) {
      this.locations = [];

      for (const brandId of this.form.value.brand) {
        const brand = this.brands.find(item => item.id === brandId);
        const _locations = [];

        for (const locationId of brand.location_id) {
          const _location = this.allLocations.find(item => item.id == locationId);

          if (_location && _locations.findIndex(item => item.id === _location.id) === -1)
            _locations.push(_location);

          for (const __location of _locations)
            this.locations.push(__location);

        }
      }

    } else {
      this.form.patchValue({
        location: null
      });

      this.locations = [...this.allLocations];
    }

    this.onSubmit();
  }

  onSubmit() {
    this.http.post('ticket/custom/brand/dashboard', this.form.value)
      .map(
        (response: any) => {
          return <DashboardInterface>response;
        }
      )
      .subscribe(
        result => {
          this.stats = result;
        }
      );
  }

  getStats() {

  }
}

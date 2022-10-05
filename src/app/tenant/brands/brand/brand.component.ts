import { LocationService } from 'app/_services/tenant/location.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { FormSnippet } from './../../../_snippets/form.snipppet';
import { CustomValidators } from 'ng2-validation';
import { BrandService } from './../../../_services/tenant/brand.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BrandModel } from './../../../_models/brand.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LocationModel } from 'app/_models/location.model';
import { TranslateService } from '@ngx-translate/core';
import { NouiFormatter } from 'ng2-nouislider';
import { DecimalPipe } from '@angular/common';

export class TimeFormatter implements NouiFormatter {
  public youtube: string = '/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;';
  constructor(private decimalPipe: DecimalPipe) { };

  to(value: number): string {
    let h = Math.floor(value / 60);
    let m = value % 60;
    let output = this.decimalPipe.transform(h, '2.0') + ":" + this.decimalPipe.transform(m, '2.0');
    return output;
  }

  from(value: string): number {
    return Number(value.split(":")[0]) * 60 + Number(value.split(":")[1]);
  }
}

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  public pageLoader: boolean;
  public form: FormGroup;
  public loading: boolean = false;
  public recordId: number = null;
  public _brand: BrandModel;
  set brand(value: BrandModel) {
    this._brand = value;
    this.populate();
  }
  get brand() {
    return this._brand;
  }
  public locations: LocationModel[];
  public rangeValues;
  public someKeyboardConfig: any = null;

  constructor(public fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    public brandService: BrandService,
    public locationService: LocationService,
    public translate: TranslateService,
    private decimalPipe: DecimalPipe) {

    //Get ID from url
    if (this.router.url.indexOf('edit') != -1) {
      this.recordId = this.route.snapshot.params['id'];
      this.pageLoader = true;
    }

    forkJoin([locationService.getAllRecords()])
      .subscribe(
        result => {
          this.locations = [...result["0"]];
        }
      );
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      // location_id: [null, []],
      range: []
    });

    if (this.recordId) {
      let method = new FormControl("PUT", [Validators.required]);
      this.form.addControl('_method', method);

      this.brandService.get(this.recordId)
        .subscribe(
          result => {
            this.brand = result;
          }
        );
    }

    this.rangeValues = [0, 1440];

    this.someKeyboardConfig = {
      connect: true,
      start: [...this.rangeValues],
      step: 10,
      tooltips: [new TimeFormatter(this.decimalPipe), new TimeFormatter(this.decimalPipe)],
      range: {
        min: 0,
        max: 1440
      },
      behaviour: 'drag',
    };
  }

  onSubmit() {
    this.loading = true;

    this.brandService.store(this.form.value)
      .subscribe(
        result => {
          this.router.navigate(['tenant/brands']);
        },
        error => {
          this.loading = false;
        }
      );
  }

  onUpdate() {
    this.loading = true;

    this.brandService.update(this.form.value, this.recordId)
      .subscribe(
        result => {
          this.router.navigate(['tenant/brands']);
        },
        error => {
          this.loading = false;
        }
      );
  }

  populate() {
    for (const item of Object.getOwnPropertyNames(new BrandModel())) {
      FormSnippet.populateValueInForm(this.form, item, this.brand[item]);
    }

    if (this.brand.range)
      this.rangeValues = this.brand.range;

    this.pageLoader = false;
  }
}

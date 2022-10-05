import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DeliveryPartnerService } from 'app/_services/tenant/delivery-partner.service';
import { DeliveryPartnerModel } from 'app/_models/delivery-partners.model';
import { FormSnippet } from 'app/_snippets/form.snipppet';

@Component({
  selector: 'app-delivery-partner',
  templateUrl: './delivery-partner.component.html',
  styleUrls: ['./delivery-partner.component.scss']
})
export class DeliveryPartnerComponent implements OnInit {
  public pageLoader: boolean;
  public form: FormGroup;
  public loading: boolean = false;
  public recordId: number = null;
  public _deliveryPartner: DeliveryPartnerModel;

  set deliveryPartner(value: DeliveryPartnerModel) {
    this._deliveryPartner = value;
    this.populate();
  }
  get deliveryPartner() {
    return this._deliveryPartner;
  }

  constructor(public fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    public deliveryPartnerService: DeliveryPartnerService) {

    //Get ID from url
    if (this.router.url.indexOf('edit') != -1) {
      this.recordId = this.route.snapshot.params['id'];
      this.pageLoader = false;
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, []],
      label: [null, []],
      is_active: [false],
      use_keys: [false, []],
      keys: this.fb.array([])
    });

    if (this.recordId) {
      let method = new FormControl("PUT", [Validators.required]);
      this.form.addControl('_method', method);

      this.deliveryPartnerService.get(this.recordId)
        .subscribe(
          result => {
            this.deliveryPartner = result;
          }
        );
    }

  }

  populate() {
    for (const item of Object.getOwnPropertyNames(new DeliveryPartnerModel())) {
      if (item !== 'keys')
        FormSnippet.populateValueInForm(this.form, item, this.deliveryPartner[item]);
    }
    this.addKeys();
    this.pageLoader = false;
  }

  onUpdate() {
    this.loading = true;

    this.deliveryPartnerService.update(this.form.value, this.recordId)
      .subscribe(
        result => {
          this.router.navigate(['tenant/delivery-partners']);
        },
        error => {
          this.loading = false;
        }
      );
  }

  addKeys() {
    const keys = this.form.get('keys') as FormArray;

    if (this.deliveryPartner.name === 'Lalamove') {
      for (const key of ["LALAMOVE_PUBLIC_KEY", "LALAMOVE_SECRET_KEY"]) {
        keys.push(this.fb.group({
          key: [key, [Validators.required]],
          value: [this.getLalamoveValue(key)]
          // value: [null]

        }));
      }
    }
  }

  getLalamoveValue(key: string) {
    if (this.deliveryPartner && this.deliveryPartner.keys)
      if (this.deliveryPartner.keys.findIndex(item => item.key === key) !== -1)
        return this.deliveryPartner.keys.find(item => item.key === key).value;

    return null;
  }

}

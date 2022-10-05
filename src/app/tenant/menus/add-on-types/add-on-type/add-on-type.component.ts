import { AddOnModel } from './../../../../_models/add-on.model';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { AddOnTypeService } from './../../../../_services/tenant/add-on-type.service';
import { AddOnTypeModel } from './../../../../_models/add-on-type.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-on-type',
  templateUrl: './add-on-type.component.html',
  styleUrls: ['./add-on-type.component.scss']
})
export class AddOnTypeComponent implements OnInit {
  public pageLoader: boolean;
  public form: FormGroup;
  public loading: boolean = false;
  public recordId: number = null;
  public _record: AddOnTypeModel = new AddOnTypeModel();
  @Input('record')
  set record(value: AddOnTypeModel) {
    this._record = value;
  }
  get record() {
    return this._record;
  }
  @Output() recordAdded = new EventEmitter<any>();

  private _addOn: AddOnModel;
  @Input('addOn')
  set addOn(value: AddOnModel) {
    this._addOn = value;
  }

  get addOn() {
    return this._addOn;
  }

  constructor(public fb: FormBuilder,
    public router: Router,
    public addOnTypeService: AddOnTypeService,
    public translate: TranslateService) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.record.name, [Validators.required]],
      price: [this.record.price, [Validators.required, CustomValidators.number]],
      add_on_id: [this.addOn.id]
    });

    if (this.record.id) {
      let method = new FormControl("PUT", [Validators.required]);
      this.form.addControl('_method', method);
    }
  }

  onSubmit() {
    this.loading = true;

    this.addOnTypeService.store(this.form.value)
      .subscribe(
        result => {
          this.form.reset();
          this.form.patchValue({
            add_on_id: this.addOn.id
          });
          this.recordAdded.emit(result);
          this.loading = false;
        },
        error => {
          this.loading = false;
        }
      );
  }

  onUpdate() {
    this.loading = true;

    this.addOnTypeService.update(this.record.id, this.form.value)
      .subscribe(
        result => {
          this.loading = false;
        },
        error => {
          this.loading = true;
        }
      );
  }
}

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddOnTypeModel } from 'app/_models/add-on-type.model';
import { AddOnService } from './../../../_services/tenant/add-on.service';
import { AddOnModel } from './../../../_models/add-on.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-on-item',
  templateUrl: './add-on-item.component.html',
  styleUrls: ['./add-on-item.component.scss']
})
export class AddOnItemComponent implements OnInit {
  public form: FormGroup;
  public loading: boolean = false;
  private _record: AddOnModel;
  public types: any = [
    { label: 'Optional', value: 'Optional' },
    { label: 'Mandatory', value: 'Mandatory' }
  ];
  public selectedType: any;
  @Input('record')
  set record(value: AddOnModel) {
    this._record = value;
  }

  get record() {
    return this._record;
  }

  private _open: boolean;
  @Input('open')
  set open(value: boolean) {
    this._open = value;
  }

  get open() {
    return this._open;
  }

  private _brandMenuId: number;
  @Input('brandMenuId')
  set brandMenuId(value: number) {
    this._brandMenuId = value;
  }

  get brandMenuId() {
    return this._brandMenuId;
  }

  @Output() recordDeleted = new EventEmitter<any>();

  constructor(public addOnService: AddOnService,
    public fb: FormBuilder,
    public translate: TranslateService) { }

  ngOnInit() {
    this.form = this.fb.group({
      add_on_id: [this.record.id, [Validators.required]],
      name: [this.record.name, [Validators.required]],
      type: [this.record.type],
    });
  }

  delete() {
    this.loading = true;

    this.addOnService.delete(this.record.id, this.brandMenuId)
      .subscribe(
        result => {
          this.recordDeleted.emit(this.record);
          this.loading = false;
        },
        error => {
          this.loading = false;
        }
      );
  }

  deleteAddOnType(addOnType: AddOnTypeModel) {
    this.record.add_on_types.splice(this.record.add_on_types.findIndex(item => item.id === addOnType.id), 1);
  }

  addToAddOnType(addOnType: AddOnTypeModel, addOn: AddOnModel) {
    if (!addOn.add_on_types) {
      addOn.add_on_types = new Array();
    }

    addOn.add_on_types.push(addOnType);
  }

  onSubmit(form: FormGroup) {
    this.loading = true;

    this.addOnService.updateDetails(form.value)
      .subscribe(
        result => {
          this.loading = false;
          this.form.patchValue({
            name: form.value.name,
            type: form.value.type
          });

          this.record.name = form.value.name;
          this.record.type = form.value.type;
        },
        error => {
          this.loading = false;
        }
      );
  }
}

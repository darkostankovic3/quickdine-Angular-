import { AddOnModel } from './../../../../_models/add-on.model';
import { AddOnTypeModel } from './../../../../_models/add-on-type.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AddOnTypeService } from 'app/_services/tenant/add-on-type.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-on-type-item',
  templateUrl: './add-on-type-item.component.html',
  styleUrls: ['./add-on-type-item.component.scss']
})
export class AddOnTypeItemComponent implements OnInit {
  public loading: boolean = false;
  public isOpen: boolean = false;
  private _record: AddOnTypeModel;
  @Input('record')
  set record(value: AddOnTypeModel) {
    this._record = value;
  }

  get record() {
    return this._record;
  }

  private _addOn: AddOnModel;
  @Input('addOn')
  set addOn(value: AddOnModel) {
    this._addOn = value;
  }

  get addOn() {
    return this._addOn;
  }

  @Output() recordDeleted = new EventEmitter<any>();

  constructor(public addOnTypeService: AddOnTypeService,
    public translate: TranslateService) { }

  ngOnInit() {
  }

  delete() {
    this.loading = true;

    this.addOnTypeService.delete(this.record.id)
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
}

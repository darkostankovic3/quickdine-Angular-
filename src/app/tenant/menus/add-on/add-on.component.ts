import { AddOnService } from './../../../_services/tenant/add-on.service';
import { Router } from '@angular/router';
import { AddOnModel } from './../../../_models/add-on.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-on',
  templateUrl: './add-on.component.html',
  styleUrls: ['./add-on.component.scss']
})
export class AddOnComponent implements OnInit {
  public pageLoader: boolean;
  public form: FormGroup;
  public loading: boolean = false;
  public recordId: number = null;
  public _record: AddOnModel;
  set record(value: AddOnModel) {
    this._record = value;
  }
  get record() {
    return this._record;
  }
  @Output() recordAdded = new EventEmitter<any>();
  public types: any = [
    { label: 'Optional', value: 'Optional' },
    { label: 'Mandatory', value: 'Mandatory' }
  ];
  public selectedType: any;
  private _brandMenuId: number;
  @Input('brandMenuId')
  set brandMenuId(value: number) {
    this._brandMenuId = value;
  }

  get brandMenuId() {
    return this._brandMenuId;
  }

  constructor(public fb: FormBuilder,
    public router: Router,
    public addOnService: AddOnService,
    public translate: TranslateService) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      brand_menu_id: [this.brandMenuId, [Validators.required]]
    });
  }

  onSubmit() {
    this.loading = true;

    this.addOnService.store(this.form.value)
      .subscribe(
        result => {
          this.form.reset();
          this.form.patchValue({
            brand_menu_id: this.brandMenuId
          });
          this.recordAdded.emit(result);
          this.loading = false;
        },
        error => {
          this.loading = false;
        }
      );
  }
}

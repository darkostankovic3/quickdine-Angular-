import { UserModel } from 'app/_models/user.model';
import { CustomValidators } from 'ng2-validation';
import { HttpClient } from '@angular/common/http';
import { SettingService } from 'app/_services/customer/setting.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  public form: FormGroup;
  public loading: boolean = false;
  @Output() out = new EventEmitter<any>();

  constructor(
    public fb: FormBuilder,
    public translate: TranslateService,
    public modal: NgbActiveModal,
    public settingService: SettingService,
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, CustomValidators.email]],
      phone_number: [null, [Validators.required]]
    });
  }

  onSubmit() {
    this.loading = true;

    this.http
      .post("customer", this.form.value)
      .map((response: any) => {
        return <UserModel>response;
      })
      .subscribe(
        result => {
          localStorage.setItem("user_id", "" + result.id);
          this.out.emit();
          this.modal.close();
        },
        error => {
          this.loading = false;
        }
      );
  }
}

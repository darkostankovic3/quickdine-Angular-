import { HttpClient } from "@angular/common/http";
import { CustomValidators } from "ng2-validation";
import { SettingService } from "app/_services/customer/setting.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { UserModel } from "app/_models/user.model";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-customer-information",
  templateUrl: "./customer-information.component.html",
  styleUrls: ["./customer-information.component.scss"]
})
export class CustomerInformationComponent implements OnInit {
  public form: FormGroup;
  public loading: boolean = false;
  @Output() out = new EventEmitter<any>();

  constructor(
    public fb: FormBuilder,
    public translate: TranslateService,
    public modal: NgbActiveModal,
    public settingService: SettingService,
    public http: HttpClient
  ) {}

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

import { CustomValidators } from "ng2-validation";
import { HttpClient } from "@angular/common/http";
import { AttachmentModel } from "./../../../_models/attachment.model";
import { ForgotPasswordComponent } from "./../../../auth/forgot-password/forgot-password.component";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { SettingService } from "app/_services/tenant/setting.service";
import { SettingModel } from "app/_models/setting.model";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  public pageLoader: boolean;
  public form: FormGroup;
  public loading: boolean = false;
  public settingsType: string[] = [
    "Ticket Reject Time",
    "Close Time",
    "Caption",
    "Second Caption",
    "Date Format",
    "Datetime Format",
    "Number Of Decimals",
    "Automatically Accept Cash Order",
    "Show Debit Payment Button",
    "Show Item Remarks",
    "Show Ticket Remarks",
    "Login Screen Placement",
    "Ask Login For Table",
    "Background Color",
    "Header Color",
    "Label Color",
    "Label2 Color",
    "Button Color",
    "Footer Color",
    "Add Button Color",
    "Link Color",
    "Body Background Color",
    "Label Background Color",
    "Menu Background Color",
    "Number Of Records",
    "Queue Language",
    "Keep Number Of Tenants",
    "Refresh Time Of Queue Page",
    "Header",
    "Footer",
    "Terms And Conditions",
    "Custom Message",
    "Pay At Counter",
  ];
  public dateFormats: string[] = ["d-m-Y", "m-d-Y"];

  public dateTimeFormats: string[] = [
    "d-m-Y H:i:s",
    "d-m-Y h:i:s",
    "m-d-Y H:i:s",
    "m-d-Y h:i:s",
  ];

  public showButton: string[] = ["Show", "Hide"];
  public loginScreen: string[] = ["Beginning", "On Checkout"];

  public askLoginForTable: string[] = ["True", "False"];

  public numberOfDecimals: string[] = ["0", "2", "3", "4"];
  public acceptOrder: any[] = ["Accept", "Not Accepted"];
  public logo_1: string = null;
  public logo_2: string = null;
  public hot_promo_background: string = null;
  public list_tenant_background: string = null;
  public find_food_background: string = null;
  public hot_seller_background: string = null;
  public welcome_image: string = null;
  public second_image: string = null;
  public languages: any[];

  private _settings: SettingModel[];
  set settings(value: SettingModel[]) {
    this._settings = value;
    console.log(value);
    this.populate();
  }
  get settings() {
    return this._settings;
  }

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public settingService: SettingService,
    private toastr: ToastrService,
    public translate: TranslateService,
    public http: HttpClient
  ) {
    this.settingService.getLogo(1).subscribe((result) => {
      this.logo_1 = (<any>result).logo;
    });

    this.settingService.getLogo(2).subscribe((result) => {
      this.logo_2 = (<any>result).logo;
    });

    this.settingService.getLogo(3).subscribe((result) => {
      this.hot_promo_background = (<any>result).logo;
    });

    this.settingService.getLogo(4).subscribe((result) => {
      this.list_tenant_background = (<any>result).logo;
    });

    this.settingService.getLogo(5).subscribe((result) => {
      this.find_food_background = (<any>result).logo;
    });

    this.settingService.getLogo(6).subscribe((result) => {
      this.hot_seller_background = (<any>result).logo;
    });

    this.settingService.getLogo(7).subscribe((result) => {
      this.welcome_image = (<any>result).logo;
    });

    this.settingService.getLogo(8).subscribe((result) => {
      this.second_image = (<any>result).logo;
    });

    this.http
      .get("customer/languages")
      .map((response: any) => {
        return <any[]>response;
      })
      .subscribe((result) => {
        this.languages = [...result];
      });
  }

  ngOnInit() {
    this.form = this.fb.group({
      settings: this.fb.array([]),
    });

    //Date ForgotPasswordComponent
    for (const type of this.settingsType) {
      const setting = new SettingModel();
      setting.type = type;
      this.addArrayForSettings(setting);
    }

    //Get setting
    this.getSetting();
  }

  getSetting() {
    this.settingService.get().subscribe(
      (result) => {
        this.settings = result;
      },
      (error) => {}
    );
  }

  addArrayForSettings(record: SettingModel = null) {
    if (record === null) {
      record = new SettingModel();
    }

    const records = this.form.get("settings") as FormArray;

    if (record.type === "Ticket Reject Time") {
      records.push(
        this.fb.group({
          type: [record.type, [Validators.required]],
          setting: [
            record.setting,
            [
              Validators.required,
              CustomValidators.number,
              CustomValidators.min(0),
            ],
          ],
        })
      );
    } else if (record.type === "Close Time") {
      records.push(
        this.fb.group({
          type: [record.type],
          setting: [
            record.setting,
            [
              Validators.required,
              CustomValidators.number,
              CustomValidators.min(0),
            ],
          ],
        })
      );
    } else if (
      record.type === "Header" ||
      record.type === "Footer" ||
      record.type === "Terms And Conditions" ||
      record.type === "Queue Language" ||
      record.type === "Custom Message"
    ) {
      records.push(
        this.fb.group({
          type: [record.type],
          setting: [record.setting],
        })
      );
    } else if (record.type === "Second Caption") {
      records.push(
        this.fb.group({
          type: [record.type],
          setting: [record.setting],
        })
      );
    } else {
      records.push(
        this.fb.group({
          type: [record.type, [Validators.required]],
          setting: [record.setting, [Validators.required]],
        })
      );
    }
  }

  onSubmit() {
    this.loading = true;

    this.settingService.store(this.form.value).subscribe(
      (result) => {
        this.loading = false;
        this.toastr.success("Success", "Setting updated successfully.");
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  populate() {
    const settings = this.form.get("settings") as FormArray;

    for (const setting of this.settings) {
      const index = this.form.value.settings.findIndex(
        (item) => item.type === setting.type
      );

      if (index !== -1) {
        const _formSetting = settings.at(index);
        _formSetting.patchValue({
          setting: setting.setting,
        });
      }
    }

    this.pageLoader = false;
  }

  uploadLogo(attachment: AttachmentModel, logo: number) {
    this.settingService
      .uploadLogo({
        attachment_id: attachment.id,
        logo: logo,
      })
      .subscribe((result) => {
        if (logo == 1) this.logo_1 = (<any>result).logo;
        else if (logo == 2) this.logo_2 = (<any>result).second_logo;
        else if (logo == 3)
          this.hot_promo_background = (<any>result).hot_promo_background;
        else if (logo == 4)
          this.list_tenant_background = (<any>result).list_tenant_background;
        else if (logo == 5)
          this.find_food_background = (<any>result).find_food_background;
        else if (logo == 6)
          this.hot_seller_background = (<any>result).hot_seller_background;
        else if (logo == 7) this.welcome_image = (<any>result).welcome_image;
        else if (logo == 8) this.second_image = (<any>result).second_image;
      });
  }

  deleteLogo(logo: number) {
    this.http
      .post("attachment/custom/delete", {
        type: "Setting",
        logo: logo,
      })
      .subscribe((result) => {
        if (logo === 1) this.logo_1 = null;
        else if (logo === 2) this.logo_2 = null;
        else if (logo === 3) this.hot_promo_background = null;
        else if (logo === 4) this.list_tenant_background = null;
        else if (logo === 5) this.find_food_background = null;
        else if (logo === 6) this.hot_seller_background = null;
        else if (logo === 7) this.welcome_image = null;
        else if (logo === 8) this.second_image = null;
      });
  }
}

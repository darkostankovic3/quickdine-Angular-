import { TranslateService } from '@ngx-translate/core';
import { FormArray, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TwilioService } from 'app/_services/tenant/twilio.service';
import { TouchSequence } from 'selenium-webdriver';
import { TwilioMethodModel } from 'app/_models/twilio-method.model';
import { ToastrService } from 'ngx-toastr';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-twilio',
  templateUrl: './twilio.component.html',
  styleUrls: ['./twilio.component.scss']
})
export class TwilioComponent implements OnInit {
  public loading: boolean;
  public form: FormGroup;
  public twilioMethod: TwilioMethodModel;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public twilioService: TwilioService,
    public translate: TranslateService,
    private toastr: ToastrService) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      twilio_method: ['Twilio'],
      keys: this.fb.array([]),
      use_twilio_keys: [false]
    });

    this.twilioService.get()
      .subscribe(
        result => {
          if (result) {
            this.twilioMethod = result;
            this.populate();
          } else {
            this.addKeys();
          }
        }
      );
  }

  onSubmit() {
    this.loading = true;

    this.twilioService.store(this.form.value).subscribe(
      result => {
        this.loading = false;
        this.toastr.success("Success", "Setting updated successfully.");
      },
      error => {
        this.loading = false;
      }
    );
  }

  getTwilioValue(key: string) {
    if (this.twilioMethod && this.twilioMethod.keys)
      if (this.twilioMethod.keys.findIndex(item => item.key === key) !== -1)
        return this.twilioMethod.keys.find(item => item.key === key).value;

    return null;
  }

  addKeys() {
    const keys = this.form.get('keys') as FormArray;

    for (const key of ["TWILIO_SID", "TWILIO_TOKEN", "TWILIO_FROM"]) {
      keys.push(this.fb.group({
        key: [key, [Validators.required]],
        value: [this.getTwilioValue(key)]
      }));
    }
  }

  populate() {
    this.form.patchValue({
      use_twilio_keys: this.twilioMethod.use_twilio_keys
    });

    this.addKeys();
  }
}

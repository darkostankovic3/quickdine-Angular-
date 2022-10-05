import { HttpClient } from '@angular/common/http';
import { FormSnippet } from './../../../_snippets/form.snipppet';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SyncModel } from 'app/_models/sync.model';
import { SyncService } from 'app/_services/tenant/sync.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, Observable } from "rxjs";
import "rxjs/add/observable/interval";

@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.scss']
})
export class SyncComponent implements OnInit, OnDestroy {
  public cronStatus: string;
  public pageLoader: boolean;
  public form: FormGroup;
  public loading: boolean = false;
  public recordId: number = null;
  public _sync: SyncModel;
  set sync(value: SyncModel) {
    this._sync = value;
    this.populate();
  }
  get sync() {
    return this._sync;
  }
  public sub: Subscription;

  constructor(public fb: FormBuilder,
    public router: Router,
    public syncService: SyncService,
    public http: HttpClient,
    public translate: TranslateService,
    private toastr: ToastrService) {
    this.syncService.get()
      .subscribe(
        result => {
          if (result)
            this.sync = result;
        }
      );
    this.getCronStatus();
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      tenant_id: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      url: [null, [Validators.required]],
      group_name: [null, []]
    });

    this.sub = Observable.interval(2000).subscribe(val => {
      this.getCronStatus();
    });
  }

  onSubmit() {
    this.loading = true;

    this.syncService.store(this.form.value)
      .subscribe(
        result => {
          this.toastr.success("Initiated request to resync data from POS", "Success");
          this.cronStatus = "Started";
          this.loading = false;
        },
        error => {
          this.loading = false;
        }
      );
  }

  populate() {
    for (const item of Object.getOwnPropertyNames(new SyncModel())) {
      FormSnippet.populateValueInForm(this.form, item, this.sync[item]);
    }

    this.pageLoader = false;
  }

  getCronStatus() {
    this.http.get('cron-status')
      .map(
        (response: any) => {
          return <[]>response;
        }
      )
      .subscribe(
        result => {
          if (result) {
            const cron = <any>result.find(item => (<any>item).cron === 'CurlLocationProduct');
            if (cron !== undefined)
              this.cronStatus = cron.queue_status;
          }
        }
      );
  }

  resyncClicked() {
    this.loading = true;

    this.http.get('sync-credentials/custom/resync')
      .subscribe(
        result => {
          this.toastr.success("Initiated request to resync data from POS", "Success");
          this.cronStatus = "Started";
          this.loading = false;
        },
        error => {
          this.loading = false;
        }
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

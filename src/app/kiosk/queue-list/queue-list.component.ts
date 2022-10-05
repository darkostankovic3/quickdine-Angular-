import { TranslateService } from "@ngx-translate/core";
import { Subscription, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { BrandService } from "app/_services/tenant/brand.service";
import { ActivatedRoute } from "@angular/router";
import { SettingService } from "app/_services/customer/setting.service";
import "rxjs/add/observable/interval";

@Component({
  selector: "app-queue-list",
  templateUrl: "./queue-list.component.html",
  styleUrls: ["./queue-list.component.scss"],
})
export class QueueListComponent implements OnInit, OnDestroy {
  name: string = "NOMOR ANTRAIN";

  public queueList: any[] = [];
  public bottomQueueList: any[] = [];
  public queueNumbers: any[] = [];
  public locationId: number = null;
  public uuid: string = null;
  public sub: Subscription;
  public last_page = null;
  public current_page = 1;

  constructor(
    public brandService: BrandService,
    public route: ActivatedRoute,
    public settingService: SettingService,
    public http: HttpClient,
    public translate: TranslateService
  ) {
    this.locationId = this.route.snapshot.params["locationId"];
    this.uuid = this.route.snapshot.params["uuid"];
  }

  ngOnInit() {
    this.settingService.getSettings().subscribe((result) => {
      const refreshTime = this.settingService.getRefreshTimeOfQueuePage();

      this.sub = Observable.interval(refreshTime * 1000).subscribe((val) => {
        this.getDetails();
      });
    });
  }

  getTopQueueList() {
    this.http
      .get(
        "brand/custom/queue/" + this.locationId + "?page=" + this.current_page
      )
      .map((response: any) => {
        return <any>response;
      })
      .subscribe((result) => {
        // this.queueList = [...result]
        this.queueList = [...result.data];
        this.last_page = result.last_page;

        if (this.current_page < this.last_page) {
          this.current_page++;
        } else {
          this.current_page = 1;
        }
      });
  }

  getBottomQueueList() {
    this.http
      .get(
        "brand/custom/all/queue-number/" +
          this.locationId +
          "?page=" +
          this.current_page
      )
      .map((response: any) => {
        return <any>response;
      })
      .subscribe((result) => {
        this.bottomQueueList = [...result];
      });
  }

  getDetails() {
    if (this.settingService.getQueueLanguageSetting()) {
      this.translate.use(this.settingService.getQueueLanguageSetting());
    }

    this.getTopQueueList();
    this.getBottomQueueList();
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}

import { SettingService } from './../../_services/customer/setting.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kiosk-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public uuid: string;
  public locationId: string;

  constructor(
    public route: ActivatedRoute,
    public translate: TranslateService,
    public settingService: SettingService
  ) {
    this.uuid = this.route.snapshot.params['uuid'];
    this.locationId = this.route.snapshot.params['locationId'];
    // if (this.route.snapshot.params['language'])
    //   translate.use(this.route.snapshot.params['language']);
    // else translate.use('en');
  }

  ngOnInit() { }

  getWelcomeImage() {
    return this.settingService.getWelcomeImage()
  }
}

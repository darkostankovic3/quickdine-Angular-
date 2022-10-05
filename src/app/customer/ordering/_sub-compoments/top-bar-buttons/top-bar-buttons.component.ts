import { ActivatedRoute } from '@angular/router';
import { SettingService } from 'app/_services/customer/setting.service';
import { CommonOrderService } from './../../../../_services/customer/common-order.service';
import { LanguageService } from 'app/_services/language.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar-buttons',
  templateUrl: './top-bar-buttons.component.html',
  styleUrls: ['./top-bar-buttons.component.scss']
})
export class TopBarButtonsComponent implements OnInit {
  public uuid: string;

  constructor(public languageService: LanguageService,
    public commonOrderService: CommonOrderService,
    public settingService: SettingService,
    public route: ActivatedRoute) {
    this.uuid = this.route.snapshot.params['uuid'];
  }

  ngOnInit() {
  }

}

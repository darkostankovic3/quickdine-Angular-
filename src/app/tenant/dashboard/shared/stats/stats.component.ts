import { SettingService } from 'app/_services/tenant/setting.service';
import { DashboardInterface } from './../../../../_interfaces/dashboard.interface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  public _stats: DashboardInterface;
  @Input('stats')
  set stats(value: DashboardInterface) {
    this._stats = value;
  }
  get stats() {
    return this._stats;
  }

  public _orderCaption: string = 'Orders';
  @Input('orderCaption')
  set orderCaption(value: string) {
    this._orderCaption = value;
  }
  get orderCaption() {
    return this._orderCaption;
  }

  constructor(public settingService: SettingService) { }

  ngOnInit() {
  }

}

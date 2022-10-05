import { Component, OnInit } from '@angular/core';
import { SettingService } from 'app/_services/customer/setting.service';

@Component({
  selector: 'app-combos',
  templateUrl: './combos.component.html',
  styleUrls: ['./combos.component.scss']
})
export class CombosComponent implements OnInit {
  constructor(public settingService: SettingService) {}

  ngOnInit() {}
}

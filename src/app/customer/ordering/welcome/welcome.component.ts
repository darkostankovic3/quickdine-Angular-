import { Router, ActivatedRoute } from '@angular/router';
import { SettingService } from './../../../_services/customer/setting.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  public uuid: string;
  public locationId: number;

  constructor(public settingService: SettingService,
    public router: Router,
    public route: ActivatedRoute) {
    this.uuid = this.route.snapshot.params['uuid'];
    this.locationId = this.route.snapshot.params['locationId'];
  }

  ngOnInit() {
  }

  startOrdering() {
    if (this.locationId)
      this.router.navigate(['ordering/' + this.uuid + '/locations/' + this.locationId]);
    else
      this.router.navigate(['ordering/' + this.uuid + '/locations']);
  }
}

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kiosk-tenant-name',
  templateUrl: './kiosk-tenant-name.component.html',
  styleUrls: ['./kiosk-tenant-name.component.scss']
})
export class KioskTenantNameComponent implements OnInit {
  constructor(
    public translate: TranslateService,
    public route: ActivatedRoute
  ) {
    if (this.route.snapshot.params['language'])
      translate.use(this.route.snapshot.params['language']);
    else translate.use('en');
  }

  ngOnInit() {}
}

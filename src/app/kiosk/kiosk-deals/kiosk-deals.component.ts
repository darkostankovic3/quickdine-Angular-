import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-kiosk-deals',
  templateUrl: './kiosk-deals.component.html',
  styleUrls: ['./kiosk-deals.component.scss']
})
export class KioskDealsComponent implements OnInit {
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

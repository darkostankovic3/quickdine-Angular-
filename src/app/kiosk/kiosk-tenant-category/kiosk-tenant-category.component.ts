import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-kiosk-tenant-category',
  templateUrl: './kiosk-tenant-category.component.html',
  styleUrls: ['./kiosk-tenant-category.component.scss']
})
export class KioskTenantCategoryComponent implements OnInit {
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

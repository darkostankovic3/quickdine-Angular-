import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kiosk-category-outside',
  templateUrl: './kiosk-category-outside.component.html',
  styleUrls: ['./kiosk-category-outside.component.scss']
})
export class KioskCategoryOutsideComponent implements OnInit {
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

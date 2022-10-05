import { SettingService } from 'app/_services/customer/setting.service';
import { BrandMenuModel } from 'app/_models/brand-menu.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from './../../../_services/customer/menu.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BrandsComponent implements OnInit {
  public brandMenus: BrandMenuModel[];
  public uuid: string = null;
  public locationId: number;

  constructor(public menuService: MenuService,
    public route: ActivatedRoute,
    public http: HttpClient,
    private toastr: ToastrService,
    public router: Router,
    public settingService: SettingService) {
    this.uuid = this.route.snapshot.params['uuid'];
    this.locationId = this.route.snapshot.params['locationId'];

    this.menuService.getMenu(this.uuid, this.locationId)
      .subscribe(
        result => {
          this.brandMenus = result;

          if (this.brandMenus.length == 1)
            this.router.navigate(['order/' + this.uuid + '/location/' + this.locationId + '/brand-menu/' + this.brandMenus[0].id]);
        }
      );
  }

  ngOnInit() {
  }

  brandClicked(brandMenu: BrandMenuModel) {
    this.router.navigate(['order/' + this.uuid + '/location/' + this.locationId + '/brand-menu/' + brandMenu.id]);
  }
}

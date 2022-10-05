import { BrandMenuModel } from './../../../_models/brand-menu.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from './../../../_services/customer/menu.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public brandMenus: BrandMenuModel[];

  constructor(public menuService: MenuService,
    public route: ActivatedRoute,
    public http: HttpClient,
    private toastr: ToastrService) {
    this.menuService.getMenu(this.route.snapshot.params['uuid'], this.route.snapshot.params['locationId'])
      .subscribe(
        result => {
          this.brandMenus = result; console.log(result);
        }
      );
  }

  ngOnInit() {
  }

}

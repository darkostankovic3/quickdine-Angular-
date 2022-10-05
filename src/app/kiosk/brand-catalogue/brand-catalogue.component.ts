import { MenuService } from './../../_services/customer/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandMenuModel } from 'app/_models/brand-menu.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-catalogue',
  templateUrl: './brand-catalogue.component.html',
  styleUrls: ['./brand-catalogue.component.scss']
})
export class BrandCatalogueComponent implements OnInit {
  public uuid: string = null;
  public brandMenu: BrandMenuModel;
  public brandMenuId: string = null;
  public locationId: string = null;

  constructor(public menuService: MenuService,
    public route: ActivatedRoute,
    public router: Router) {
    this.uuid = this.route.snapshot.params["uuid"];
    this.brandMenuId = this.route.snapshot.params["brandMenuId"];
    this.locationId = this.route.snapshot.params["locationId"];
    this.getCatalogue();

  }

  ngOnInit() {
  }

  getCatalogue() {
    this.menuService
      .getBrandMenu(
        this.uuid,
        this.brandMenuId,
        this.locationId
      )
      .subscribe(result => {
        this.brandMenu = result;
      });
  }

  categoryClicked(record: any) {
    this.router.navigate(['/kiosk/uuid/' + this.uuid + '/location/' + this.locationId + '/brands/' + this.brandMenuId + '/catalogue/' + record.id + '/list'])
  }
}

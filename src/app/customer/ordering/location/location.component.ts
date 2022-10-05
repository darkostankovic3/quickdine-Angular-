import { BrandMenuModel } from './../../../_models/brand-menu.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from './../../../_services/customer/menu.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LocationService } from 'app/_services/tenant/location.service';
import { CartService } from 'app/_services/customer/cart.service';
import { forkJoin } from "rxjs/observable/forkJoin";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  public uuid: string;
  public locationId: number;
  public brandMenus: BrandMenuModel[];
  public deliveryPartnerObj: any = null;

  constructor(public http: HttpClient,
    public menuService: MenuService,
    public route: ActivatedRoute,
    public router: Router,
    public locationService: LocationService,
    public cartService: CartService) {
    this.uuid = this.route.snapshot.params['uuid'];
    this.locationId = this.route.snapshot.params['locationId'];

    forkJoin([this.menuService.getMenu(this.uuid, this.locationId), this.locationService.getLocationDeliveryPartner(this.locationId)])
      .subscribe(
        result => {
          this.cartService.locationDeliveryPartner = (<any>result[1]).delivery_partner;
          this.cartService.isDelivery = (<any>result[1]).is_delivery;
          this.brandMenus = (<any>result[0]);

          if (this.brandMenus.length == 1)
            this.router.navigate(['brand-menu/' + this.brandMenus[0].id], { relativeTo: this.route });
        }
      );
  }

  ngOnInit() {
  }

  brandClicked(brandMenu: BrandMenuModel) {
    this.router.navigate(['brand-menu/' + brandMenu.id], { relativeTo: this.route });
  }

}

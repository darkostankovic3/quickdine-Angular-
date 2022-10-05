import { CartService } from 'app/_services/customer/cart.service';
import { SettingService } from 'app/_services/customer/setting.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocationModel } from 'app/_models/location.model';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  public locations: LocationModel[];

  constructor(public http: HttpClient,
    public router: Router,
    public settingService: SettingService,
    public cartService: CartService) {
    this.http.post('customer/locations', {
      table_id: this.cartService.tableId,
      otp: this.cartService.otp
    })
      .map((response: any) => {
        return <LocationModel[]>response;
      })
      .subscribe(
        result => {
          this.locations = result;

          if (this.locations.length == 1) {
            let uuid: string = '-1';
            if (localStorage.getItem('uuid'))
              uuid = localStorage.getItem('uuid');

            this.router.navigate(['order/' + uuid + '/location/' + this.locations[0].id]);
          }

        }
      );
  }

  ngOnInit() {
  }

  locationClicked(location: LocationModel) {
    this.router.navigate(['order/-1/location/' + location.id]);
  }
}

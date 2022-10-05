import { Router, ActivatedRoute } from '@angular/router';
import { LocationModel } from './../../../_models/location.model';
import { CartService } from './../../../_services/customer/cart.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { ProductComponent } from '../_modals/product/product.component';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  public locations: LocationModel[];
  public uuid: string;

  constructor(public modalService: NgbModal,
    public http: HttpClient,
    public cartService: CartService,
    public router: Router,
    public route: ActivatedRoute) {
    this.uuid = this.route.snapshot.params['uuid'];
    localStorage.setItem('uuid', this.uuid);

    this.getLocations();
  }

  getLocations() {
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

          if (this.locations.length == 1)
            this.router.navigate([this.locations[0].id], { relativeTo: this.route });
        }
      );
  }

  ngOnInit() {
  }

  productClicked() {
    this.modalService.open(ProductComponent, { size: 'sm' });
  }

  locationClicked(id: number) {
    this.router.navigate([id], { relativeTo: this.route });
  }
}

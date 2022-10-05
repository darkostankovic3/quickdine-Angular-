import { TicketModel } from './../../../_models/ticket.model';
import { HttpClient } from '@angular/common/http';
import { CartService } from './../../../_services/customer/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public uuid: string = null;
  public locationId: string = null;
  payment: string;

  constructor(public route: ActivatedRoute,
    public cartService: CartService,
    public router: Router,
    public http: HttpClient,
    private toastr: ToastrService) {
    this.uuid = this.route.snapshot.params['uuid'];
    this.locationId = this.route.snapshot.params['locationId'];
  }

  ngOnInit() {
  }

  homeClicked() {
    this.router.navigate(['order/' + this.uuid + '/location/' + this.locationId]);
  }

  getTotal() {
    let total = 0;
    for (const menu of this.cartService.cartMenus) {
      total += menu.quantity * menu.price;
    }
    return total;
  }

  placeOrder() {
    return this.http.post('ticket', {
      location_id: this.locationId,
      menus: this.cartService.cartMenus,
      payment_method: this.payment
    }).map(
      (response: any) => {
        return <TicketModel>response;
      }
    ).subscribe(
      result => {
        this.toastr.success('Order successfully placed.', 'Success');
        if (result.status === 'Pending') {
          return this.router.navigate(['order/' + this.uuid + '/order-placed/ticket/' + result.id]);
        }
        //this.cartService.cartMenus = [...[]];
      }
    );
  }
}

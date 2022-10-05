import { HttpClient } from '@angular/common/http';
import { MenuModel } from './../../../_models/menu.model';
import { BrandMenuModel } from './../../../_models/brand-menu.model';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from './../../../_services/customer/menu.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [MenuService]
})
export class OrderComponent implements OnInit {
  public brandMenus: BrandMenuModel[];
  public cartMenus: MenuModel[] = [];

  constructor(public menuService: MenuService,
    public route: ActivatedRoute,
    public http: HttpClient,
    private toastr: ToastrService) {
    this.menuService.getMenu(this.route.snapshot.params['uuid'], this.route.snapshot.params['locationId'])
      .subscribe(
        result => {
          this.brandMenus = result;
        }
      );
  }

  ngOnInit() {
  }

  addToCart(menu: MenuModel) {
    if (isNaN(menu.quantity)) {
      menu.quantity = 0;
    }

    //Check is already added.
    if (this.cartMenus.findIndex(item => item.id === menu.id) === -1)
      this.cartMenus.push(menu);

    menu.quantity++;
  }

  removeFromCart(_index: number) {
    this.cartMenus.splice(_index, 1);
  }

  onSubmit() {
    return this.http.post('ticket', {
      location_id: this.route.snapshot.params['locationId'],
      menus: this.cartMenus
    }).subscribe(
      result => {
        this.toastr.success('Order successfully placed.', 'Success');
        this.cartMenus = [...[]];
      }
    );
  }
}

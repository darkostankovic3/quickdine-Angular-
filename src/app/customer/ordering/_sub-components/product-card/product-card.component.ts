import { ActivatedRoute } from '@angular/router';
import { SettingService } from './../../../../_services/customer/setting.service';
import { MenuModel } from './../../../../_models/menu.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { ProductComponent } from '../../_modals/product/product.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  public _menu: MenuModel;
  @Input('menu')
  set menu(value: MenuModel) {
    this._menu = value;
  }
  get menu() {
    return this._menu;
  }
  public uuid: string;
  public menuId: number;
  public brandMenuId: number;
  public locationId: number;

  constructor(public modalService: NgbModal,
    public settingService: SettingService,
    public route: ActivatedRoute) {
    this.uuid = this.route.snapshot.params['uuid'];
    this.brandMenuId = this.route.snapshot.params['brandMenuId'];
    this.menuId = this.route.snapshot.params['menuId'];
    this.locationId = this.route.snapshot.params['locationId'];
  }

  ngOnInit() {
    console.log(this.menu)
  }

  productClicked() {
    const product = this.modalService.open(ProductComponent, { size: 'sm' }).componentInstance;
    product.uuid = this.uuid;
    product.brandMenuId = this.brandMenuId;
    product.locationId = this.locationId;
    product.menuId = this.menu.parent_id;
    product.productId = this.menu.id;
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' })
      .result
      .then((result) => {
        // this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }
  openerror(error) {
    this.modalService.open(error, { ariaLabelledBy: 'modal-basic-title', size: 'sm' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
}

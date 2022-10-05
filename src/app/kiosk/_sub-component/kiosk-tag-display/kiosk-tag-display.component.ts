import { CartDisplayComponent } from './../../_modals/cart-display/cart-display.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-kiosk-tag-display',
  templateUrl: './kiosk-tag-display.component.html',
  styleUrls: ['./kiosk-tag-display.component.scss']
})
export class KioskTagDisplayComponent implements OnInit {
  public _menu: any;
  @Input("menu")
  set menu(value: any) {
    this._menu = value;
    this.product = this.menu.product;
  }
  get menu() {
    return this._menu;
  }

  public _product: any;
  @Input("product")
  set product(value: any) {
    this._product = value;
  }
  get product() {
    return this._product;
  }

  constructor(public modalService: NgbModal) { }

  ngOnInit() {
  }

  showTag(product) {
    let show = false;

    for (const tag of product.selected_tags) {
      for (const tagItem of tag.tag_items) {
        if (tagItem.is_selected == true)
          show = true;

        if (show === true)
          break;
      }

      if (show === true)
        break;
    }

    return show;
  }

  openTagModal(tags: any) {
    const modalRef = this.modalService
      .open(CartDisplayComponent, {
        size: 'lg',
        windowClass: 'xt-modal-class'
      }).componentInstance;

    modalRef.tags = tags;
  }
}

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from './../../../../_services/tenant/product.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from 'app/_models/product.model';

@Component({
  selector: 'app-brand-items',
  templateUrl: './brand-items.component.html',
  styleUrls: ['./brand-items.component.scss']
})
export class BrandItemsComponent implements OnInit {
  public _form: FormGroup = null;
  @Input('form')
  set form(value: FormGroup) {
    this._form = value;
  }
  get form() {
    return this._form;
  }

  public _index: number = null;
  @Input('index')
  set index(value: number) {
    this._index = value;
  }
  get index() {
    return this._index;
  }

  public products: ProductModel[];

  constructor(public productService: ProductService,
    public modal: NgbActiveModal) {
    this.productService.getAllRecords()
      .subscribe(
        result => {
          this.products = [...result];
        }
      );
  }

  ngOnInit() {
  }
}

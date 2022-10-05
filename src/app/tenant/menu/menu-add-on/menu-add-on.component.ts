import { AddOnModel } from './../../../_models/add-on.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-add-on',
  templateUrl: './menu-add-on.component.html',
  styleUrls: ['./menu-add-on.component.scss']
})
export class MenuAddOnComponent implements OnInit {
  private _addOn: AddOnModel;
  @Input('addOn')
  set addOn(value: AddOnModel) {
    this._addOn = value;
  }

  get open() {
    return this._addOn;
  }

  constructor() { }

  ngOnInit() {
  }

}

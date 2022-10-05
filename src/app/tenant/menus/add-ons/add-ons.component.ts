import { DragulaService } from 'ng2-dragula';
import { AddOnService } from './../../../_services/tenant/add-on.service';
import { AddOnModel } from './../../../_models/add-on.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AddOnTypeModel } from 'app/_models/add-on-type.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-ons',
  templateUrl: './add-ons.component.html',
  styleUrls: ['./add-ons.component.scss']
})
export class AddOnsComponent implements OnInit {
  public addOns: AddOnModel[];
  private _brandMenuId: number;
  @Input('brandMenuId')
  set menu(value: number) {
    this._brandMenuId = value;
    this.getAddOns();
  }

  get brandMenuId() {
    return this._brandMenuId;
  }
  subs = new Subscription();
  @Output() addOnDeleted = new EventEmitter<AddOnModel>();

  constructor(public addOnService: AddOnService,
    private dragulaService: DragulaService) {
    
  }

  ngOnInit() {
  }

  getAddOns() {
    this.addOnService.getAddOnsForBrandMenu(this.brandMenuId)
      .subscribe(
        result => {
          this.addOns = [...result];
        }
      );
  }

  addToAddOn(addOn: AddOnModel) {
    this.addOns.push(addOn);
  }

  addToAddOnType(addOnType: AddOnTypeModel, addOn: AddOnModel) {
    if (!addOn.add_on_types) {
      addOn.add_on_types = new Array();
    }

    addOn.add_on_types.push(addOnType);
  }

  deleteAddOn(addOn: AddOnModel) {
    const index = this.addOns.findIndex(item => item.id === addOn.id);
    this.addOns.splice(index, 1);
    this.addOnDeleted.emit(addOn);
  }

  deleteAddOnType() {

  }
}

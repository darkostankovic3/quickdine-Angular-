import { SettingService } from "app/_services/customer/setting.service";
import { AddOnTypeModel } from "app/_models/add-on-type.model";
import { AddOnModel } from "./../../../_models/add-on.model";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MenuModel } from "app/_models/menu.model";

@Component({
  selector: "app-add-on",
  templateUrl: "./add-on.component.html",
  styleUrls: ["./add-on.component.scss"]
})
export class AddOnComponent implements OnInit {
  private _addOn: AddOnModel;
  @Input("addOn")
  set addOn(value: AddOnModel) {
    this._addOn = value;
  }
  get addOn() {
    return this._addOn;
  }

  private _menu: MenuModel;
  @Input("menu")
  set menu(value: MenuModel) {
    this._menu = value;
  }
  get menu() {
    return this._menu;
  }

  private _locationId: number;
  @Input("locationId")
  set locationId(value: number) {
    this._locationId = value;
  }
  get locationId() {
    return this._locationId;
  }

  private _uuid: string;
  @Input("uuid")
  set uuid(value: string) {
    this._uuid = value;
  }
  get uuid() {
    return this._uuid;
  }

  public addOnTypes: AddOnTypeModel[];
  public selected: AddOnTypeModel[] = new Array();
  @Output() validate = new EventEmitter<boolean>();
  @Output() recordAdded = new EventEmitter<AddOnTypeModel[]>();

  constructor(public http: HttpClient, public settingService: SettingService) {}

  ngOnInit() {
    this.http
      .post("customer/add-ons/get", {
        location_id: this.locationId,
        menu_id: this.menu.id,
        uuid: this.uuid,
        add_on_id: this.addOn.id
      })
      .map((response: any) => {
        return <AddOnTypeModel[]>response;
      })
      .subscribe(result => {
        this.addOnTypes = result;
        this.validateAddOn();
      });
  }

  validateAddOn() {
    if (this.addOn.type === "Mandatory" && this.selected.length === 0) {
      this.validate.emit(false);
      this.addOn.validate = false;
    } else {
      this.addOn.validate = true;
      return this.validate.emit(true);
    }
  }

  addClicked(addOn: AddOnTypeModel) {
    if (isNaN(addOn.quantity)) {
      addOn.quantity = 0;
    }
    addOn.quantity++;

    const addOnTypeInArray = this.selected.findIndex(
      item => item.id === addOn.id
    );
    if (addOnTypeInArray === -1) {
      this.selected.push({ ...addOn });
    } else {
      this.selected.find(item => item.id === addOn.id).quantity =
        addOn.quantity;
    }

    this.validateAddOn();
    this.recordAdded.emit(this.selected);
  }

  removeClicked(addOn: AddOnTypeModel) {
    if (isNaN(addOn.quantity)) {
      addOn.quantity = 0;
    }
    if (addOn.quantity > 0) addOn.quantity--;

    if (addOn.quantity === 0) {
      const addOnTypeInArray = this.selected.findIndex(
        item => item.id === addOn.id
      );

      if (addOnTypeInArray !== -1) this.selected.splice(addOnTypeInArray, 1);
    }

    this.validateAddOn();
    this.recordAdded.emit(this.selected);
  }
}

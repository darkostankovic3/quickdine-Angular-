import { AddOnModel } from './../../_models/add-on.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddOnService {

  constructor(public http: HttpClient) { }

  getAllRecords() {
    return this.http.get('add-on')
      .map(
        (response: any) => {
          return <AddOnModel[]>response;
        }
      );
  }

  get(id: number) {
    return this.http.get('add-on/' + id)
      .map(
        (response: any) => {
          return <AddOnModel>response;
        }
      );
  }

  store(form: any) {
    return this.http.post('add-on', form)
      .map(
        (response: any) => {
          return <AddOnModel>response;
        }
      );
  }

  update(id: number, form: any) {
    return this.http.post('add-on/' + id, form)
      .map(
        (response: any) => {
          return <AddOnModel>response;
        }
      );
  }

  delete(id: number, brandMenuId: number) {
    return this.http.post('add-on/custom/' + id + '/delete/' + brandMenuId, {
      _method: "DELETE"
    });
  }

  getAddOnsForBrandMenu(brandMenuId: number) {
    return this.http.get('add-on/custom/get/items/' + brandMenuId)
      .map(
        (response: any) => {
          return <AddOnModel[]>response;
        }
      );
  }

  deleteAddOnType() {

  }

  updateDetails(form: any) {
    return this.http.post('add-on/custom/update/details', form);
  }
}

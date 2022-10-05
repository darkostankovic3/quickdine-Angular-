import { BrandMenuModel } from './../../_models/brand-menu.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrandMenuService {

  constructor(public http: HttpClient) { }

  getAllRecords() {
    return this.http.get('brand-menu')
      .map(
        (response: any) => {
          return <BrandMenuModel[]>response;
        }
      );
  }

  get(id: number) {
    return this.http.get('brand-menu/' + id)
      .map(
        (response: any) => {
          return <BrandMenuModel>response;
        }
      );
  }

  store(form: any) {
    return this.http.post('brand-menu', form)
      .map(
        (response: any) => {
          return <BrandMenuModel>response;
        }
      );
  }

  update(form: any, id: number) {
    return this.http.post('brand-menu/' + id, form)
      .map(
        (response: any) => {
          return <BrandMenuModel>response;
        }
      );
  }

  delete(id: number) {
    return this.http.post('brand-menu/' + id, {
      _method: "DELETE"
    })
  }
}

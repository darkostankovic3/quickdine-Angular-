import { BrandModel } from './../../_models/brand.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrandMenuModel } from 'app/_models/brand-menu.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  constructor(public http: HttpClient) { }

  getAllRecords() {
    return this.http.get('brand')
      .map(
        (response: any) => {
          return <BrandModel[]>response;
        }
      );
  }

  get(id: number) {
    return this.http.get('brand/' + id)
      .map(
        (response: any) => {
          return <BrandModel>response;
        }
      );
  }

  store(form: any) {
    return this.http.post('brand', form);
  }

  update(form: any, id: number) {
    return this.http.post('brand/' + id, form);
  }

  delete(id: number) {
    return this.http.post('brand/' + id, {
      _method: "DELETE"
    })
  }

  getBrandMenusForBrand(brandId: number) {
    return this.http.get('brand/custom/brand-menus/' + brandId)
      .map(
        (response: any) => {
          return <BrandMenuModel[]>response;
        }
      );
  }

  getQueueList(){
    return this.http.get('brand/custom/queue/1')
  }

  getQueueNumberWithoutBrand(){
    return this.http.get('brand/custom/all/queue-number/1')
  }
}

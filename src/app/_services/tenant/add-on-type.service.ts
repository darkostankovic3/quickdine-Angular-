import { AddOnTypeModel } from './../../_models/add-on-type.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddOnTypeService {
  constructor(public http: HttpClient) { }

  getAllRecords() {
    return this.http.get('add-on-type')
      .map(
        (response: any) => {
          ``
          return <AddOnTypeModel[]>response;
        }
      );
  }

  get(id: number) {
    return this.http.get('add-on-type/' + id)
      .map(
        (response: any) => {
          return <AddOnTypeModel>response;
        }
      );
  }

  store(form: any) {
    return this.http.post('add-on-type', form)
      .map(
        (response: any) => {
          return <AddOnTypeModel>response;
        }
      );
  }

  update(id: number, form: any) {
    return this.http.post('add-on-type/' + id, form)
      .map(
        (response: any) => {
          return <AddOnTypeModel>response;
        }
      );
  }

  delete(id: number) {
    return this.http.post('add-on-type/' + id, {
      _method: "DELETE"
    });
  }
}

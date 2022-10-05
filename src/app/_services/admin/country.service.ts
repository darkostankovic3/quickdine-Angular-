import { CountryModel } from './../../_models/country.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(public http: HttpClient) {

  }

  getAllRecords() {
    return this.http.get('admin/countries')
      .map(
        (response: any) => {
          return <CountryModel[]>response;
        }
      );
  }

  get(id: number) {
    return this.http.get('admin/countries/' + id)
      .map(
        (response: any) => {
          return <CountryModel>response;
        }
      );
  }

  store(form: any) {
    return this.http.post('admin/countries', form);
  }

  update(form: any, id: number) {
    return this.http.post('admin/countries/' + id, form);
  }

  delete(id: number) {
    return this.http.post('admin/countries/' + id, {
      _method: "DELETE"
    });
  }
}

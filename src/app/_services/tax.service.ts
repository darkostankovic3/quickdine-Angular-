import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaxModel } from 'app/_models/tax.model';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  constructor(public http: HttpClient) { }

  getAllRecords() {
    return this.http.get('tax')
      .map(
        (response: any) => {
          return <TaxModel[]>response;
        }
      );
  }

  get(id: number) {
    return this.http.get('tax/' + id)
      .map(
        (response: any) => {
          return <TaxModel>response;
        }
      );
  }

  store(form: any) {
    return this.http.post('tax', form);
  }

  update(form: any, id: number) {
    return this.http.post('tax/' + id, form);
  }

  delete(id: number) {
    return this.http.post('tax/' + id, {
      _method: "DELETE"
    })
  }
}

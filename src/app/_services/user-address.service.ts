import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAddressService {

  constructor(public http: HttpClient) { }

  getAllAddress() {
    return this.http.get('customer/addresses')
      .map(
        (response: any) => {
          return <any[]>response;
        }
      );
  }

  store(form: any) {
    return this.http.post('customer/addresses', form)
      .map(
        (response: any) => {
          return <any>response;
        }
      );
  }

  delete(id: number) {
    return this.http.post('customer/addresses/' + id, {
      _method: 'DELETE'
    })
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeliveryPartnerModel } from 'app/_models/delivery-partners.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveryPartnerService {

  constructor(public http: HttpClient) { }

  get(id: number) {
    return this.http.get("delivery-partner/" + id).map((response: any) => {
      return <DeliveryPartnerModel>response;
    });
  }

  update(form: any, id: number){
    return this.http.post("delivery-partner/" + id, form);
  }
}

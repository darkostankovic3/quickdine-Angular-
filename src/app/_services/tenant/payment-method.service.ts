import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentMethodModel } from './../../_models/payment-method.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  constructor(public http: HttpClient) {

  }

  getAllRecords() {
    return this.http.get('payment-methods')
      .map(
        (response: any) => {
          return <PaymentMethodModel[]>response;
        }
      );
  }

  get(id: number) {
    return this.http.get('payment-methods/' + id)
      .map(
        (response: any) => {
          return <PaymentMethodModel>response;
        }
      );
  }

  update(form: any, id: number) {
    return this.http.post('payment-methods/' + id, form);
  }


  getAllRecordWithTrue() {
    return this.http.get('payment-methods/custom/only/true')
      .map(
        (response: any) => {
          return <PaymentMethodModel[]>response;
        }
      );
  }

  getCardCharges(method: string, totalAmount: number) {
    return this.http.post('card-charges', {
      payment_method: method,
      total_amount: totalAmount
    })
  }
}

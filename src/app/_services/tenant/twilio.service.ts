import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TwilioMethodModel } from 'app/_models/twilio-method.model';

@Injectable({
  providedIn: 'root'
})
export class TwilioService {

  constructor(public http: HttpClient) { }

  store(form: any) {
    return this.http.post('twilio-methods', form);
  }

  get() {
    return this.http.get('twilio-methods/custom/get/twilio')
      .map(
        (response: any) => {
          return <TwilioMethodModel>response;
        }
      );
  }
}

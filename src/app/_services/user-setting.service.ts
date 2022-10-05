import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSettingModel } from 'app/_models/user-setting.model';

@Injectable({
  providedIn: 'root'
})
export class UserSettingService {

  constructor(public http: HttpClient) { }

  store(form: any) {
    return this.http.post('user-setting', form);
  }

  get(type: string) {
    return this.http.get('user-setting/' + type)
      .map(
        (response: any) => {
          return <any>response;
        }
      );
  }
}

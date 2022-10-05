import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TenantUsersService {

  constructor(public http: HttpClient) { }

  store(form: any) {
    return this.http.post('website-users', form);
  }

  delete(id: number) {
    return this.http.post('website-users/' + id, {
      _method: "DELETE"
    });
  }
}

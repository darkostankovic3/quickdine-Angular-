import { UserModel } from './../_models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) {

  }

  get(id: number) {
    return this.http.get('admin/users/' + id)
      .map(
        (response: any) => {
          return <UserModel>response;
        }
      );
  }

  store(form: any) {
    return this.http.post('admin/users', form);
  }

  update(form: any, id: number) {
    return this.http.post('admin/users/' + id, form);
  }

  getAllRecords() {
    return this.http.get('admin/users')
      .map(
        (response: any) => {
          return <UserModel[]>response;
        }
      );
  }

  delete(id: number) {
    return this.http.post('admin/users/' + id, {
      _method: "DELETE"
    });
  }

  getUsersWithNoTenant() {
    return this.http.get('admin/users/custom/get/with-no-tenant')
      .map(
        (response: any) => {
          return <UserModel[]>response;
        }
      );
  }

  tenantUsers() {
    return this.http.get('admin/tenant/custom/users')
      .map(
        (response: any) => {
          return <UserModel[]>response;
        }
      );
  }

  myProfile(form: any) {
    return this.http.post("user/custom/profile/update", form);
  }
}

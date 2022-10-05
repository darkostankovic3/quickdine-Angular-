import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { UserModel } from 'app/_models/user.model';

@Injectable()
export class AuthService {
  public currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  public currentUserType(): string {
    const currentUser = this.currentUserValue;

    if (currentUser && currentUser.type)
      return currentUser.type;

    return null;
  }

  register(form: any) {
    return this.http.post('register', form);
  }

  login(form: any) {
    return this.http.post('login', form)
      .map(
        (response: any) => {
          localStorage.setItem('token', response.token);

          if (response.user.uuid && response.user.uuid !== null)
            localStorage.setItem('uuid', response.user.uuid);

          if (response.user.default_language && response.user.default_language !== null)
            localStorage.setItem('language', response.user.default_language);

          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
          return response.user;
        }
      );
  }

  forgotPassword(form: any) {
    return this.http.post('forgot/password', form);
  }

  logout() {
    localStorage.clear();
    this.currentUserSubject.next(null);
  }

  isAuthenticated() {
    // here you can check if user is authenticated or not through his token 
    return true;
  }

  activate(token: string) {
    return this.http.get('activate/' + token);
  }

  resetPassword(form: any) {
    return this.http.post('reset/password', form);
  }

  myDetails(): Observable<UserModel> {
    return this.http.get('my-details')
      .map(
        (response: any) => {
          return <UserModel>response;
        }
      )
  }

  update(form: any) {
    return this.http.post("user", form);
  }

  // Customer Login
  customerLogin(form: any) {
    return this.http.post('customer/login', form)
      .map(
        (response: any) => {
          localStorage.setItem('token', response.token);

          if (response.user.uuid && response.user.uuid !== null)
            localStorage.setItem('uuid', response.user.uuid);

          if (response.user.default_language && response.user.default_language !== null)
            localStorage.setItem('language', response.user.default_language);

          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
          return response.user;
        }
      );
  }
}

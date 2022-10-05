import { environment } from './../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-as',
  templateUrl: './login-as.component.html',
  styleUrls: ['./login-as.component.scss']
})
export class LoginAsComponent implements OnInit {
  public loginUrl: string;
  private _token: string;
  @Input('token')
  set token(value: string) {
    this._token = value; console.log(value);
  }

  get token() {
    return this._token;
  }

  constructor(public activeModal: NgbActiveModal) {

  }

  ngOnInit() {
    this.loginUrl = environment.loginAs + this.token;
    console.log(this.loginUrl);
  }
}

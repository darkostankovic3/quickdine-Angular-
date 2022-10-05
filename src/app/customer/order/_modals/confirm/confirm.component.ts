import { HttpClient } from '@angular/common/http';
import { SettingService } from 'app/_services/customer/setting.service';
import { CartService } from './../../../../_services/customer/cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketModel } from 'app/_models/ticket.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  public loading: boolean;
  public _locationId: number;
  @Input('locationId')
  set locationId(value: number) {
    this._locationId = value;
  }
  get locationId() {
    return this._locationId;
  }

  public _uuid: string;
  @Input('uuid')
  set uuid(value: string) {
    this._uuid = value;
  }
  get uuid() {
    return this._uuid;
  }

  constructor(public modal: NgbActiveModal,
    public cartService: CartService,
    public settingService: SettingService,
    public http: HttpClient,
    public router: Router) { }

  ngOnInit() {
  }

  placeOrder() {
    this.modal.close();
    this.router.navigate(['order/' + this.uuid + '/location/' + this.locationId + '/payment']);
  }
}

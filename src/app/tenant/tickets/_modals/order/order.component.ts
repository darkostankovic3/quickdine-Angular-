import { SettingService } from './../../../../_services/tenant/setting.service';
import { TicketModel } from './../../../../_models/ticket.model';
import { TicketService } from 'app/_services/tenant/ticket.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  private _orderId: number;
  public ticket: TicketModel;

  @Input('orderId')
  set orderId(value: number) {
    this._orderId = value;
    this.ticketService.get(this.orderId)
      .subscribe(
        result => {
          this.ticket = result;
        }
      );
  }
  get orderId() {
    return this._orderId;
  }

  constructor(public activeModal: NgbActiveModal,
    public ticketService: TicketService,
    public settingService: SettingService) { }

  ngOnInit() {
  }

}

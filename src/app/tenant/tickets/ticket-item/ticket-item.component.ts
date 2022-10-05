import { SettingService } from './../../../_services/tenant/setting.service';
import { TicketModel } from './../../../_models/ticket.model';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, OnDestroy {
  public _ticket: TicketModel;
  @Input('ticket') set ticket(value: TicketModel) {
    this._ticket = value;
    this.timeLeft = this.ticket.time_left;
  }
  get ticket() {
    return this._ticket;
  }

  public timeLeft: number = null;;
  public interval;
  @Output() action = new EventEmitter<any>();
  public sub: Subscription;

  constructor(public settingService: SettingService) {

  }

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    this.sub = Observable.interval(1000)
      .subscribe((val) => {
        if (this.timeLeft > 0) {
          this.timeLeft--;

          if (this.timeLeft === 0 && this.ticket.status === 'Pending')
            this.action.emit('Reject');
        }
      });
  }

  pauseTimer() {
    this.sub.unsubscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

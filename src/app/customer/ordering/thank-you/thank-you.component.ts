import { SettingService } from 'app/_services/customer/setting.service';
import { TranslateService } from '@ngx-translate/core';
import { TicketService } from 'app/_services/customer/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketModel } from 'app/_models/ticket.model';
import { Subscription, Observable, interval } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import "rxjs/add/observable/interval";
import { AuthService } from 'app/_services/auth.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
  public uuid: string = null;
  public ticketId: number = null;
  public qrCode: string = null;
  public sub: Subscription;
  public status: string = null;
  public ticket: TicketModel;
  public interval;
  public isTable: boolean = false;

  constructor(
    public route: ActivatedRoute,
    public ticketService: TicketService,
    public translate: TranslateService,
    public router: Router,
    public settingService: SettingService,
    public authService: AuthService
  ) {
    this.uuid = this.route.snapshot.params["uuid"];
    this.ticketId = this.route.snapshot.params["ticketId"];

    this.ticketService.getQrCode(this.uuid, this.ticketId).subscribe(result => {
      this.qrCode = result;
    });

    if (localStorage.getItem('tableId'))
      this.isTable = true;

    localStorage.removeItem('tableId');
  }

  ngOnInit() {
    this.checkTicketStatus();
    // this.sub = Observable.interval(2000).subscribe(val => {
    //   this.checkTicketStatus();
    // });
  }

  checkTicketStatus() {
    this.ticketService.show(this.uuid, this.ticketId).subscribe(result => {
      this.ticket = result;
      this.status = result.status;
      if (this.authService.currentUserValue) {
        this.authService.logout();
      }
      this.redirect();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  redirect() {

    if (!this.isTable) {
      this.sub = Observable.interval(this.settingService.getCloseTime() * 1000).subscribe(val => {
        this.router.navigate(['/ordering/' + this.uuid + '/welcome/location/' + this.ticket.location_id]);
      });
    }

  }
}

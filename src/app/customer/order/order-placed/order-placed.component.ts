import { SettingService } from "./../../../_services/customer/setting.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { TicketService } from "app/_services/customer/ticket.service";
import { Subscription, Observable } from "rxjs";
import "rxjs/add/observable/interval";
import { TicketModel } from "app/_models/ticket.model";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-order-placed",
  templateUrl: "./order-placed.component.html",
  styleUrls: ["./order-placed.component.scss"],
  providers: [TicketService]
})
export class OrderPlacedComponent implements OnInit, OnDestroy {
  public uuid: string = null;
  public ticketId: number = null;
  public qrCode: string = null;
  public sub: Subscription;
  public status: string = null;
  public ticket: TicketModel;

  constructor(
    public route: ActivatedRoute,
    public ticketService: TicketService,
    public translate: TranslateService,
    public router: Router,
    public settingService: SettingService
  ) {
    this.uuid = this.route.snapshot.params["uuid"];
    this.ticketId = this.route.snapshot.params["ticketId"];

    this.ticketService.getQrCode(this.uuid, this.ticketId).subscribe(result => {
      this.qrCode = result;
    });
  }

  ngOnInit() {
    this.sub = Observable.interval(2000).subscribe(val => {
      this.checkTicketStatus();
    });
  }

  checkTicketStatus() {
    this.ticketService.show(this.uuid, this.ticketId).subscribe(result => {
      this.ticket = result;
      this.status = result.status;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

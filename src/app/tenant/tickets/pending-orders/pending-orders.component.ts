import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OrderComponent } from './../_modals/order/order.component';
import { TicketModel } from './../../../_models/ticket.model';
import { TicketService } from 'app/_services/tenant/ticket.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss']
})
export class PendingOrdersComponent implements OnInit, OnDestroy {
  public tickets: TicketModel[] = [];
  public locationId: number;
  public brandId: number;
  public sub: Subscription;
  public allTicketIds = [];

  constructor(public ticketService: TicketService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    public route: ActivatedRoute,
    public router: Router) {
    if (this.router.url.indexOf('location') != -1) {
      this.locationId = this.route.snapshot.params['locationId'];
      this.brandId = this.route.snapshot.params['brandId'];
    } else {
      this.locationId = null;
      this.brandId = null;
    }

    this.getTickets();
  }

  getTickets() {
    this.allTicketIds = [...[]];

    if (this.locationId === null) {
      this.ticketService.getLastThreeMinutes()
        .subscribe(
          result => {
            let playSound = false;
            for (const ticket of result) {
              let index = this.tickets.findIndex(item => item.id === ticket.id);
              this.allTicketIds.push(ticket.id);

              if (index === -1) {
                this.tickets.push(ticket);
                playSound = true;
              }else{
                this.tickets[index] = {...ticket};
              }
            }

            if (playSound)
              this.playAudio();

            this.removeExtraTickets();
          }
        );
    } else {
      this.ticketService.getLastThreeMinutesForLocation(this.locationId, this.brandId)
        .subscribe(
          result => {
            let playSound = false;
            
            for (const ticket of result) {
              let index = this.tickets.findIndex(item => item.id === ticket.id);
              this.allTicketIds.push(ticket.id);

              if (this.tickets.findIndex(item => item.id === ticket.id) === -1) {
                this.tickets.push(ticket);
                if (ticket.status == 'Pending' && playSound === false)
                  playSound = true;
              }else{
                this.tickets[index] = {...ticket};
              }
            }

            if (playSound)
              this.playAudio();

              this.removeExtraTickets();
          }
        );
    }
  }

  removeExtraTickets() {
    let tickets = [];

    for(const ticketId of this.allTicketIds){
      let index = this.tickets.findIndex(item => item.id === ticketId);
      if(index != -1){
        tickets.push(this.tickets[index]);
      }
    }

    this.tickets = [...tickets];
  }

  ngOnInit() {
    this.sub = Observable.interval(30000)
      .subscribe((val) => { this.getTickets(); });
  }

  updateStatus(status: string, ticket: TicketModel) {
    this.toastr.info('Please wait while we update the order.', 'info');
    ticket.status = status;

    if (status === 'Reject')
      this.tickets.splice(this.tickets.findIndex(item => item.id === ticket.id), 1);

    return this.ticketService.updateStatus(ticket.id, status)
      .subscribe(
        result => {
          if (status === 'Deliver')
            this.tickets.splice(this.tickets.findIndex(item => item.id === ticket.id), 1);
        }
      );
  }

  ticketDetails(ticket: TicketModel) {
    const modal = this.modalService.open(OrderComponent, { size: 'lg' }).componentInstance;

    modal.orderId = ticket.id;
  }

  playAudio() {
    let audio = new Audio();
    audio.src = "../../../../assets/img/ticket-sound.wav";
    audio.load();
    audio.play();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

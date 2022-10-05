import { TicketModel } from './../../_models/ticket.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(public http: HttpClient) { }

  getAllRecords() {
    return this.http.get('ticket')
      .map(
        (response: any) => {
          return <TicketModel[]>response;
        }
      );
  }

  get(id: number) {
    return this.http.get('ticket/' + id)
      .map(
        (response: any) => {
          return <TicketModel>response;
        }
      );
  }

  getLastThreeMinutes() {
    return this.http.get('ticket/custom/records/bytime')
      .map(
        (response: any) => {
          return <TicketModel[]>response;
        }
      );
  }

  getLastThreeMinutesForLocation(locationId: number, brandId: number) {
    return this.http.get('ticket/custom/records/location/' + locationId + '/brands/' + brandId)
      .map(
        (response: any) => {
          return <TicketModel[]>response;
        }
      );
  }

  updateStatus(ticketId: number, status: string) {
    return this.http.post('ticket/custom/update/status', {
      ticket_id: ticketId,
      status: status
    });
  }
}

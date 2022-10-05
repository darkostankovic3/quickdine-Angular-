import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TicketModel } from 'app/_models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(public http: HttpClient) { }

  show(uuid: string, id: number) {
    localStorage.setItem('uuid', uuid);
    return this.http.get('customer/ticket/' + id)
      .map(
        (response: any) => {
          return <TicketModel>response;
        }
      )
  }

  getQrCode(uuid: string, id: number) {
    localStorage.setItem('uuid', uuid);
    return this.http.post('customer/ticket/custom/generate/qr-code', {
      ticket_id: id
    })
      .map(
        (response: any) => {
          return <string>response.qr;
        }
      )
  }
}

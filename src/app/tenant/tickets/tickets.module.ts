import { SharedModule } from 'app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets/tickets.component';
import { OrderComponent } from './_modals/order/order.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { TicketItemComponent } from './ticket-item/ticket-item.component';

@NgModule({
  declarations: [TicketsComponent, PendingOrdersComponent, OrderItemComponent, TicketItemComponent],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    SharedModule
  ],
  entryComponents: []
})
export class TicketsModule { }

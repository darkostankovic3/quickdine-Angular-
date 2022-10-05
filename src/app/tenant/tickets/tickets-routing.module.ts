import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketsComponent } from './tickets/tickets.component';

const routes: Routes = [
  {
    path: '',
    component: PendingOrdersComponent,
    data: { title: 'All Tickets' }
  },
  {
    path: 'location/:locationId/brand/:brandId',
    component: PendingOrdersComponent,
    data: { title: 'All Tickets' }
  },
  {
    path: 'datatable',
    component: TicketsComponent,
    data: { title: 'All Tickets' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }

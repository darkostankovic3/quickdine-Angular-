import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryPartnersComponent } from './delivery-partners/delivery-partners.component';
import { DeliveryPartnerComponent } from './delivery-partner/delivery-partner.component';

const routes: Routes = [
    {
        path: '',
        component: DeliveryPartnersComponent,
        data: { title: 'All Delivery Partners' }
    },
    {
        path: 'edit/:id',
        component: DeliveryPartnerComponent,
        data: { title: 'Edit Delivery Partner' }
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DeliveryPartnersRoutingModule { }
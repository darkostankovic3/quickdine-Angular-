import { DeliveryPartnersComponent } from './delivery-partners/delivery-partners.component';
import { DeliveryPartnerComponent } from './delivery-partner/delivery-partner.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { NgModule } from '@angular/core';
import { DeliveryPartnersRoutingModule } from './delivery-partners-routing.module';

@NgModule({
    declarations: [DeliveryPartnerComponent, DeliveryPartnersComponent],
    imports: [
      CommonModule,
      DeliveryPartnersRoutingModule,
      SharedModule
    ]
  })
  export class DeliveryPartnersModule { }
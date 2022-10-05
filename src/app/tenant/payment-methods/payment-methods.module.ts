import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentMethodsRoutingModule } from './payment-methods-routing.module';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';

@NgModule({
  declarations: [PaymentMethodsComponent, PaymentMethodComponent],
  imports: [
    CommonModule,
    PaymentMethodsRoutingModule,
    SharedModule
  ]
})
export class PaymentMethodsModule { }

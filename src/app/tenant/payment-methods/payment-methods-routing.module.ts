import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';

const routes: Routes = [
  {
    path: 'add',
    component: PaymentMethodComponent,
    data: { title: 'Add Payment Method' }
  },
  {
    path: 'edit/:id',
    component: PaymentMethodComponent,
    data: { title: 'Edit Payment Method' }
  },
  {
    path: '',
    component: PaymentMethodsComponent,
    data: { title: 'All Payment Methods' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentMethodsRoutingModule { }

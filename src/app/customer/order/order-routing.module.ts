import { LanguageComponent } from './language/language.component';
import { LocationsComponent } from './locations/locations.component';
import { PaymentComponent } from './payment/payment.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { EnterOtpComponent } from './enter-otp/enter-otp.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CartComponent } from './cart/cart.component';
import { MenusComponent } from './menus/menus.component';
import { BrandsComponent } from './brands/brands.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';
import { OmisePayComponent } from './omise-pay/omise-pay.component';
import { CardPayComponent } from './card-pay/card-pay.component';
import { WizardComponent } from './wizard/wizard.component';

const routes: Routes = [
  {
    path: 'locations',
    component: LocationsComponent,
    data: { title: 'List All Brands' }
  },
  {
    path: ':uuid/location/:locationId',
    component: BrandsComponent,
    data: { title: 'List All Brands' }
  },
  {
    path: ':uuid/location/:locationId/brand-menu/:brandMenuId',
    component: ItemsComponent,
    data: { title: 'Menu' }
  },
  {
    path: ':uuid/location/:locationId/brand-menu/:brandMenuId/menu/:menuId',
    component: MenusComponent,
    data: { title: 'Menu' }
  },
  {
    path: ':uuid/location/:locationId/cart',
    component: CartComponent,
    data: { title: 'Menu' }
  },
  {
    path: ':uuid/table/:tableId',
    component: CustomerFormComponent,
    data: { title: 'Menu' }
  },
  {
    path: ':uuid/table/:tableId/enter/otp/location/:locationId',
    component: EnterOtpComponent,
    data: { title: 'Enter OTP' }
  },
  {
    path: ':uuid/order-placed/ticket/:ticketId',
    component: OrderPlacedComponent,
    data: { title: 'Menu' }
  },
  {
    path: ':uuid/thank-you/:status',
    component: ThankYouComponent,
    data: { title: 'Menu' }
  },
  {
    path: ':uuid/location/:locationId/payment',
    component: PaymentComponent,
    data: { title: 'Menu' }
  },
  {
    path: ':uuid/location/:locationId/:paymentMethod',
    component: CardPayComponent,
    data: { title: 'Menu' }
  },
  {
    path: 'wizard',
    component: WizardComponent,
    data: { title: 'Menu' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }

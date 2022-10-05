import { CartService } from './../../_services/customer/cart.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order/order.component';
import { SharedModule } from 'app/shared/shared.module';
import { IndexComponent } from './index/index.component';
import { BrandsComponent } from './brands/brands.component';
import { ItemsComponent } from './items/items.component';
import { MenusComponent } from './menus/menus.component';
import { CartComponent } from './cart/cart.component';
import { OrderActionComponent } from './order-action/order-action.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { EnterOtpComponent } from './enter-otp/enter-otp.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { SettingService } from 'app/_services/customer/setting.service';
import { ConfirmComponent } from './_modals/confirm/confirm.component';
import { FooterComponent } from './footer/footer.component';
import { PaymentComponent } from './payment/payment.component';
import { MenusTypeSecondComponent } from './menus-type-second/menus-type-second.component';
import { QuantityCardComponent } from './quantity-card/quantity-card.component';
import { AddonComponent } from './_modals/addon/addon.component';
import { AddOnComponent } from './add-on/add-on.component';
import { OmisePayComponent } from './omise-pay/omise-pay.component';
import { CardPayComponent } from './card-pay/card-pay.component';
import { CustomerInformationComponent } from './_modals/customer-information/customer-information.component';
import { LocationsComponent } from './locations/locations.component';
import { AnimateButtonComponent } from './_sub-components/animate-button/animate-button.component';
import { CombosComponent } from './_modals/combos/combos.component';
import { ShowUpsellComponent } from './_modals/show-upsell/show-upsell.component';
import { ShowComboComponent } from './_modals/show-combo/show-combo.component';
import { ProductTagComponent } from './product-tag/product-tag.component';
import { ComboDetailsComponent } from './_sub-components/combo-details/combo-details.component';
import { TagDisplayComponent } from './_sub-components/tag-display/tag-display.component';
import { UpsellDisplayComponent } from './_sub-components/upsell-display/upsell-display.component';
import { ProductComboDisplayComponent } from './_sub-components/product-combo-display/product-combo-display.component';
import { WizardComponent } from './wizard/wizard.component';

@NgModule({
  declarations: [
    OrderComponent,
    IndexComponent,
    BrandsComponent,
    ItemsComponent,
    MenusComponent,
    CartComponent,
    OrderActionComponent,
    CustomerFormComponent,
    EnterOtpComponent,
    OrderPlacedComponent,
    ThankYouComponent,
    ConfirmComponent,
    FooterComponent,
    PaymentComponent,
    MenusTypeSecondComponent,
    QuantityCardComponent,
    AddonComponent,
    AddOnComponent,
    OmisePayComponent,
    CardPayComponent,
    CustomerInformationComponent,
    LocationsComponent,
    AnimateButtonComponent,
    CombosComponent,
    ShowUpsellComponent,
    ShowComboComponent,
    ProductTagComponent,
    ComboDetailsComponent,
    WizardComponent
  ],
  imports: [CommonModule, OrderRoutingModule, SharedModule],
  providers: [CartService, SettingService],
  entryComponents: [
    ConfirmComponent,
    AddonComponent,
    CustomerInformationComponent,
    CombosComponent,
    ShowUpsellComponent,
    ShowComboComponent
  ]
})
export class OrderModule { }

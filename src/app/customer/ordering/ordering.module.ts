import { CustomerOnCheckoutGuardGuard } from './../../_guards/customer-on-checkout-guard.guard';
import { CustomerAuthGuard } from './../../_guards/customer-auth-guard.guard';
import { CartService } from './../../_services/customer/cart.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { OrderingRoutingModule } from './ordering-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { MenusComponent } from './menus/menus.component';
import { LocationsComponent } from './locations/locations.component';
import { BrandsComponent } from './brands/brands.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductComponent } from './_modals/product/product.component';
import { ErrorComponent } from './_modals/error/error.component';
import { MenuListComponent } from './_sub-components/menu-list/menu-list.component';
import { MenuComponent } from './_sub-components/menu/menu.component';
import { ProductCardComponent } from './_sub-components/product-card/product-card.component';
import { CardComponent } from './_sub-components/card/card.component';
import { HeaderComponent } from './_sub-components/header/header.component';
import { WizardComponent } from './wizard/wizard.component';
import { SharedModule } from 'app/shared/shared.module';
import { LocationComponent } from './location/location.component';
import { BrandMenuComponent } from './brand-menu/brand-menu.component';
import { ProductsComponent } from './products/products.component';
import { TagComponent } from './_sub-components/tag/tag.component';
import { ComboDetailsComponent } from './_sub-components/combo-details/combo-details.component';
import { LanguagesComponent } from './languages/languages.component';
import { TopBarButtonsComponent } from './_sub-compoments/top-bar-buttons/top-bar-buttons.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { FooterComponent } from './footer/footer.component';
import { CustomerDetailComponent } from './_modals/customer-detail/customer-detail.component';
import { TopBarActionComponent } from './_sub-components/top-bar-action/top-bar-action.component';
import { TableOtpComponent } from './table-otp/table-otp.component';
import { MenuNotificationComponent } from './_sub-components/menu-notification/menu-notification.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TagDisplayComponent } from './_sub-components/tag-display/tag-display.component';
import { ComboDisplayComponent } from './_sub-components/combo-display/combo-display.component';
import { ClearOrderComponent } from './_modals/clear-order/clear-order.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ActivateAccountComponent } from './auth/activate-account/activate-account.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { UserAddressesComponent } from './user-addresses/user-addresses.component';
import { SliderModule } from 'ngx-slider';
import { OmiseFailedComponent } from './omise-failed/omise-failed.component';
import { SubCategoryProductsComponent } from './sub-category-products/sub-category-products.component';


@NgModule({
  declarations: [CheckoutComponent,
    MenusComponent,
    LocationsComponent,
    BrandsComponent,
    PaymentComponent,
    ProductComponent,
    ErrorComponent,
    MenuListComponent, MenuComponent, ProductCardComponent, CardComponent,
    HeaderComponent, WizardComponent, LocationComponent, BrandMenuComponent,
    ProductsComponent, TagComponent, ComboDetailsComponent, LanguagesComponent,
    TopBarButtonsComponent, ThankYouComponent, FooterComponent, CustomerDetailComponent,
    TopBarActionComponent, TableOtpComponent, MenuNotificationComponent, WelcomeComponent,
    TagDisplayComponent, ComboDisplayComponent, ClearOrderComponent, LoginComponent,
    RegisterComponent, ForgotPasswordComponent, ResetPasswordComponent,
    ActivateAccountComponent, DepartmentListComponent, UserAddressesComponent, OmiseFailedComponent, SubCategoryProductsComponent
  ],
  imports: [
    CommonModule,
    OrderingRoutingModule,
    SharedModule,
    SliderModule
  ],
  entryComponents: [
    ProductComponent,
    CustomerDetailComponent,
    ClearOrderComponent
  ],
  providers: [
    CartService,
    CustomerAuthGuard,
    CustomerOnCheckoutGuardGuard
  ]
})
export class OrderingModule { }

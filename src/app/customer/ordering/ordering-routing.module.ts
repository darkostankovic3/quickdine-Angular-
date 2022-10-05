import { SubCategoryProductsComponent } from "./sub-category-products/sub-category-products.component";
import { SubCategoryService } from "app/_services/customer/sub-category.service";
import { SettingResolverService } from "./../../_services/customer/setting-resolver.service";
import { CustomerOnCheckoutGuardGuard } from "./../../_guards/customer-on-checkout-guard.guard";
import { CustomerAuthGuard } from "./../../_guards/customer-auth-guard.guard";
import { WelcomeComponent } from "./welcome/welcome.component";
import { TableOtpComponent } from "./table-otp/table-otp.component";
import { ThankYouComponent } from "./thank-you/thank-you.component";
import { ProductsComponent } from "./products/products.component";
import { BrandMenuComponent } from "./brand-menu/brand-menu.component";
import { LocationComponent } from "./location/location.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LocationsComponent } from "../ordering/locations/locations.component";
import { WizardComponent } from "./wizard/wizard.component";
import { PaymentComponent } from "./payment/payment.component";
import { LanguagesComponent } from "./languages/languages.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { ForgotPasswordComponent } from "./auth/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./auth/reset-password/reset-password.component";
import { ActivateAccountComponent } from "./auth/activate-account/activate-account.component";
import { DepartmentListComponent } from "./department-list/department-list.component";
import { UserAddressesComponent } from "./user-addresses/user-addresses.component";
import { OmiseFailedComponent } from "./omise-failed/omise-failed.component";

const routes: Routes = [
  {
    path: ":uuid/languages",
    component: LanguagesComponent,
    data: { title: "Select Language" },
    resolve: { settings: SettingResolverService },
  },
  {
    path: ":uuid/wizard",
    component: WizardComponent,
    data: { title: "Make Payment" },
    resolve: { settings: SettingResolverService },
  },
  {
    path: ":uuid/welcome/location/:locationId",
    component: WelcomeComponent,
    data: { title: "Welcome" },
    resolve: { settings: SettingResolverService },
  },
  {
    path: ":uuid/welcome",
    component: WelcomeComponent,
    data: { title: "Welcome" },
    resolve: { settings: SettingResolverService },
  },
  {
    path: ":uuid/locations",
    component: LocationsComponent,
    data: { title: "Locations" },
    canActivate: [CustomerAuthGuard],
    resolve: { settings: SettingResolverService },
  },
  {
    path: ":uuid/locations/:locationId",
    component: LocationComponent,
    data: { title: "Location" },
    canActivate: [CustomerAuthGuard],
    resolve: { settings: SettingResolverService },
  },
  {
    path: ":uuid/locations/:locationId/brand-menu/:brandMenuId",
    component: BrandMenuComponent,
    data: { title: "Brand Menus" },
    canActivate: [CustomerAuthGuard],
    resolve: { settings: SettingResolverService },
  },
  {
    path: ":uuid/locations/:locationId/brand-menu/:brandMenuId/menu/:menuId",
    component: ProductsComponent,
    data: { title: "Products" },
    canActivate: [CustomerAuthGuard],
    resolve: { settings: SettingResolverService },
  },
  {
    path: ":uuid/locations/:locationId/brand-menu/:brandMenuId/menu/:menuId/sub-category/:subCategory",
    component: SubCategoryProductsComponent,
    data: { title: "Products" },
    canActivate: [CustomerAuthGuard],
    resolve: { settings: SettingResolverService },
  },
  {
    path: ":uuid/locations/:locationId/checkout",
    component: CheckoutComponent,
    data: { title: "Checkout" },
    canActivate: [CustomerOnCheckoutGuardGuard],
    resolve: { settings: SettingResolverService },
  },
  {
    path: ":uuid/locations/:locationId/payment",
    component: PaymentComponent,
    data: { title: "Payment" },
    canActivate: [CustomerAuthGuard],
    resolve: { settings: SettingResolverService },
  },
  {
    path: ":uuid/locations/:locationId/payment/:paymentMethod",
    component: PaymentComponent,
    data: { title: "Make Payment" },
    canActivate: [CustomerAuthGuard],
    resolve: { settings: SettingResolverService },
  },
  {
    path: ":uuid/successful/ticket/:ticketId",
    component: ThankYouComponent,
    data: { title: "Thank you" },
    resolve: { settings: SettingResolverService },
  },
  {
    path: ":uuid/table/:tableId/otp/location/:locationId",
    component: TableOtpComponent,
    data: { title: "Enter OTP" },
    resolve: { settings: SettingResolverService },
  },
  {
    path: ":uuid/auth/login",
    component: LoginComponent,
    data: { title: "Login" },
    resolve: { settings: SettingResolverService },
  },
  {
    path: ":uuid/auth/register",
    component: RegisterComponent,
    data: { title: "Register" },
    resolve: { settings: SettingResolverService },
  },
  {
    path: ":uuid/auth/forgot-password",
    component: ForgotPasswordComponent,
    data: { title: "Forgot password" },
    resolve: { settings: SettingResolverService },
  },
  {
    path: ":uuid/auth/reset-password/:token",
    component: ResetPasswordComponent,
    data: { title: "Reset password" },
    resolve: { settings: SettingResolverService },
  },
  {
    path: ":uuid/activate/:token",
    component: ActivateAccountComponent,
    data: { title: "Activate Account" },
    resolve: { settings: SettingResolverService },
  },
  {
    path: ":uuid/locations/:locationId/department/list",
    component: DepartmentListComponent,
    data: { title: "List Department" },
    resolve: { settings: SettingResolverService },
  },
  {
    path: ":uuid/user-address",
    component: UserAddressesComponent,
    data: { title: "User Addresses" },
    resolve: { settings: SettingResolverService },
  },
  {
    path: ":uuid/failed/:message",
    component: OmiseFailedComponent,
    data: { title: "Omise Failed" },
    resolve: { settings: SettingResolverService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SubCategoryService],
})
export class OrderingRoutingModule {}

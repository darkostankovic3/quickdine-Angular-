import { SettingResolverService } from "./_services/customer/setting-resolver.service";
import { OrderingFullLayoutComponent } from "./ordering-full-layout/ordering-full-layout.component";
import { OrderFullLayoutComponent } from "./order-full-layout/order-full-layout.component";
import { LanguageComponent } from "./customer/order/language/language.component";
import { LanguageCheckGuard } from "./_guards/language-check.guard";
import { AdminUserGuard } from "./_guards/admin-user.guard";
import { CustomerUserGuard } from "./_guards/customer-user.guard";
import { TenantUserGuard } from "./_guards/tenant-user.guard";
import { Customer_Full_ROUTES } from "./shared/routes/customer-full-layout.routes";
import { Admin_Full_ROUTES } from "./shared/routes/admin-full-layout.routes";
import { AuthGuard } from "./_guards/auth.guard";
import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";

import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { Tenant_Full_ROUTES } from "./shared/routes/tenant-full-layout.routes";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { TagComponent } from "./shared/tag/tag.component";
import { SpinnerComponent } from "./shared/spinner/spinner.component";

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "ordering/-1/welcome",
    pathMatch: "full",
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "order",
    component: OrderFullLayoutComponent,
    loadChildren: () =>
      import("./customer/order/order.module").then((m) => m.OrderModule),
    canActivate: [LanguageCheckGuard],
  },
  {
    path: "ordering",
    component: OrderingFullLayoutComponent,
    loadChildren: () =>
      import("./customer/ordering/ordering.module").then(
        (m) => m.OrderingModule
      ),
  },
  {
    path: "ordering-theme",
    component: ContentLayoutComponent,
    loadChildren: () =>
      import("./customer/ordering-theme/ordering-theme.module").then(
        (m) => m.OrderingThemeModule
      ),
  },
  {
    path: "order/language",
    component: LanguageComponent,
    data: { title: "Select Language" },
  },
  {
    path: "kiosk",
    component: ContentLayoutComponent,
    loadChildren: () =>
      import("../app/kiosk/kiosk.module").then((m) => m.KioskModule),
  },
  //{ path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES, canActivate: [AuthGuard] },
  //{ path: '', component: ContentLayoutComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES, canActivate: [AuthGuard] },
  {
    path: "admin",
    component: FullLayoutComponent,
    data: { title: "content Views" },
    children: Admin_Full_ROUTES,
    canActivate: [AuthGuard, AdminUserGuard],
  },
  {
    path: "customer",
    component: FullLayoutComponent,
    data: { title: "content Views" },
    children: Customer_Full_ROUTES,
    canActivate: [AuthGuard, CustomerUserGuard],
  },
  {
    path: "tenant",
    component: FullLayoutComponent,
    data: { title: "content Views" },
    children: Tenant_Full_ROUTES,
    canActivate: [AuthGuard, TenantUserGuard],
  },
  {
    path: "tag-modal",
    component: TagComponent,
  },
  {
    path: "spinner",
    component: SpinnerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { SettingResolverService } from './_services/customer/setting-resolver.service';
import { SettingService } from 'app/_services/customer/setting.service';
import { CommonOrderService } from './_services/customer/common-order.service';
import { LanguageComponent } from './customer/order/language/language.component';
import { LanguageCheckGuard } from './_guards/language-check.guard';
import { LanguageService } from './_services/language.service';
import { DragulaService, DragulaModule } from 'ng2-dragula';
import { AdminUserGuard } from './_guards/admin-user.guard';
import { AuthGuard } from './_guards/auth.guard';
import { AuthService } from './_services/auth.service';
import { HttpConfigInterceptor } from './_interceptors/httpconfig.interceptor';

import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./shared/shared.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';

import { AppComponent } from './app.component';
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CustomerUserGuard } from './_guards/customer-user.guard';
import { MenuAddOnComponent } from './tenant/menu/menu-add-on/menu-add-on.component';
import { OrderFullLayoutComponent } from './order-full-layout/order-full-layout.component';
import { OrderingFullLayoutComponent } from './ordering-full-layout/ordering-full-layout.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { DeviceDetectorService } from 'ngx-device-detector';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./translations/", ".json");
}

// export function init_app(settingService: SettingService) {
//   return () => settingService.load();
// }
@NgModule({
  declarations: [AppComponent, FullLayoutComponent, ContentLayoutComponent, MenuAddOnComponent, LanguageComponent, OrderFullLayoutComponent, OrderingFullLayoutComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    NgbModule.forRoot(),
    NgxMaskModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    PerfectScrollbarModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    DragulaModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    LanguageCheckGuard,
    CustomerUserGuard,
    // CustomerOnCheckoutGuardGuard,
    AdminUserGuard,
    AdminUserGuard,
    DragulaService,
    SettingService,
    SettingResolverService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    // { provide: APP_INITIALIZER, useFactory: init_app, deps: [SettingService], multi: true },

    LanguageService,
    CommonOrderService,
    DeviceDetectorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

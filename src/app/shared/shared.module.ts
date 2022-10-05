import { StatsComponent } from './../tenant/dashboard/shared/stats/stats.component';
import { ProductComboDisplayComponent } from './../customer/order/_sub-components/product-combo-display/product-combo-display.component';
import { UpsellDisplayComponent } from './../customer/order/_sub-components/upsell-display/upsell-display.component';
import { TagDisplayComponent } from './../customer/order/_sub-components/tag-display/tag-display.component';
import { OrderComponent } from './../tenant/tickets/_modals/order/order.component';
import { ProductService } from './../_services/tenant/product.service';
import { TableService } from './../_services/table.service';
import { CountryService } from './../_services/admin/country.service';
import { TicketService } from './../_services/tenant/ticket.service';
import { BrandMenuService } from './../_services/tenant/brand-menu.service';
import { BrandService } from './../_services/tenant/brand.service';
import { AddOnTypeService } from './../_services/tenant/add-on-type.service';
import { AddOnService } from './../_services/tenant/add-on.service';
import { MenuService } from './../_services/menu.service';
import { SettingService } from './../_services/tenant/setting.service';
import { InvalidTooltipDirective } from './../_directives/invalid-tooltip.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe, CurrencyPipe } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

//COMPONENTS
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NotificationSidebarComponent } from './notification-sidebar/notification-sidebar.component';

//DIRECTIVES
import { ToggleFullscreenDirective } from "./directives/toggle-fullscreen.directive";
import { SidebarDirective } from './directives/sidebar.directive';
import { SidebarLinkDirective } from './directives/sidebarlink.directive';
import { SidebarListDirective } from './directives/sidebarlist.directive';
import { SidebarAnchorToggleDirective } from './directives/sidebaranchortoggle.directive';
import { SidebarToggleDirective } from './directives/sidebartoggle.directive';
import { CustomFormsModule } from 'ng2-validation'
import { SweetAlertService } from 'app/_services/sweet-alert.service';

import { TableModule } from 'primeng/table';
import { NgSelectModule } from '@ng-select/ng-select';

import { TenantService } from 'app/_services/tenant.service';
import { UserService } from 'app/_services/user.service';
import { LoginAsComponent } from './login-as/login-as.component';
import { SafePipe } from 'app/_pipes/safe.pipe';
import { LocationService } from 'app/_services/tenant/location.service';
import { TaxService } from 'app/_services/tax.service';

import { SelectButtonModule } from 'primeng/selectbutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ArchwizardModule } from 'angular-archwizard';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileDroppa } from "file-droppa";
import { PaymentMethodService } from 'app/_services/tenant/payment-method.service';
import { CheckboxModule } from 'primeng/checkbox';
import { SliderModule } from 'primeng/slider';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { CustomizerComponent } from './customizer/customizer.component';
import { UserSettingService } from 'app/_services/user-setting.service';
import { Daterangepicker } from 'ng2-daterangepicker';
import { DateRangePickerCustomComponent } from './date-range-picker-custom/date-range-picker-custom.component';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { TagComponent } from './tag/tag.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SpinnerComponent } from './spinner/spinner.component';
import { NgxMaskModule } from 'ngx-mask';
@NgModule({
    exports: [
        CommonModule,
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        NotificationSidebarComponent,
        ToggleFullscreenDirective,
        SidebarDirective,
        NgbModule,
        NgxMaskModule,
        TranslateModule,
        CustomizerComponent,

        FormsModule,
        ReactiveFormsModule,
        CustomFormsModule,
        TableModule,
        NgSelectModule,
        SelectButtonModule,
        RadioButtonModule,
        ArchwizardModule,

        InvalidTooltipDirective,

        LoginAsComponent,
        SafePipe,
        FileUploadComponent,
        FileDroppa,
        CheckboxModule,
        SliderModule,
        DateRangePickerComponent,
        TagDisplayComponent,
        UpsellDisplayComponent,
        ProductComboDisplayComponent,
        Daterangepicker,
        DateRangePickerCustomComponent,
        StatsComponent,
        DeleteConfirmComponent,
        InfiniteScrollModule,
        SpinnerComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        NgxMaskModule,
        TranslateModule,
        PerfectScrollbarModule,
        FormsModule,
        ReactiveFormsModule,
        CustomFormsModule,
        TableModule,
        NgSelectModule,
        SelectButtonModule,
        RadioButtonModule,
        ArchwizardModule,
        FileDroppa,
        CheckboxModule,
        SliderModule,
        Daterangepicker,
        InfiniteScrollModule
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        NotificationSidebarComponent,
        ToggleFullscreenDirective,
        SidebarDirective,
        SidebarLinkDirective,
        SidebarListDirective,
        SidebarAnchorToggleDirective,
        SidebarToggleDirective,
        InvalidTooltipDirective,
        LoginAsComponent,
        SafePipe,
        FileUploadComponent,
        DateRangePickerComponent,
        CustomizerComponent,
        OrderComponent,
        TagDisplayComponent,
        UpsellDisplayComponent,
        ProductComboDisplayComponent,
        DateRangePickerCustomComponent,
        StatsComponent,
        DeleteConfirmComponent,
        TagComponent,
        SpinnerComponent
    ],
    providers: [SweetAlertService,
        TenantService,
        UserService,
        LocationService,
        SettingService,
        TaxService,
        MenuService,
        AddOnService,
        AddOnTypeService,
        BrandService,
        BrandMenuService,
        TicketService,
        CountryService,
        TableService,
        ProductService,
        PaymentMethodService,
        DecimalPipe,
        UserSettingService,
        CurrencyPipe],
    entryComponents: [OrderComponent, DeleteConfirmComponent]
})
export class SharedModule { }

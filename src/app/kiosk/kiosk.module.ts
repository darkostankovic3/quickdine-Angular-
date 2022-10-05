import { QzTrayService } from './../_services/kiosk/qz-tray.service';
import { QueueListComponent } from './queue-list/queue-list.component';
import { CartService } from 'app/_services/customer/cart.service';
import { SettingService } from 'app/_services/customer/setting.service';
import { ConfigService } from 'app/shared/services/config.service';
import { KioskComponent } from './kiosk/kiosk.component';
import { SharedModule } from 'app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KioskRoutingModule } from './kiosk-routing.module';
import { IndexComponent } from './index/index.component';
import { KioskEndComponent } from './kiosk-end/kiosk-end.component';
import { KioskHomeComponent } from './kiosk-home/kiosk-home.component';
import { KioskProductDetailsComponent } from './kiosk-product-details/kiosk-product-details.component';
import { KioskProductDetailNoteComponent } from './kiosk-product-detail-note/kiosk-product-detail-note.component';
import { KioskTenantCategoryComponent } from './kiosk-tenant-category/kiosk-tenant-category.component';
import { KioskTenantNameComponent } from './kiosk-tenant-name/kiosk-tenant-name.component';
import { KioskCategoryOutsideComponent } from './kiosk-category-outside/kiosk-category-outside.component';
import { KioskDealsComponent } from './kiosk-deals/kiosk-deals.component';
import { KioskTenantListComponent } from './kiosk-tenant-list/kiosk-tenant-list.component';
import { KioskSearchComponent } from './kiosk-search/kiosk-search.component';
import { KioskCartComponent } from './kiosk-cart/kiosk-cart.component';
import { BrandsComponent } from './brands/brands.component';
import { BrandCatalogueComponent } from './brand-catalogue/brand-catalogue.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { TagComponent } from './_sub-components/tag/tag.component';
import { ComboDetailsComponent } from './_sub-components/combo-details/combo-details.component';
import { CartComponent } from './cart/cart.component';
import { CartButtonComponent } from './_sub-components/cart-button/cart-button.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { HeaderComponent } from './_sub-components/header/header.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SearchCategoryComponent } from './_sub-components/search-category/search-category.component';
import { ProductCardComponent } from './_sub-components/product-card/product-card.component';
import { SearchProductComponent } from './_modals/search-product/search-product.component';
import { CartDisplayComponent } from './_modals/cart-display/cart-display.component';
import { BrandProductsComponent } from './brand-products/brand-products.component';
import { OrderCompletedComponent } from './order-completed/order-completed.component';
import { ComboDisplayComponent } from './_sub-component/combo-display/combo-display.component';
import { KioskTagDisplayComponent } from './_sub-component/kiosk-tag-display/kiosk-tag-display.component';
import { LanguageComponent } from './language/language.component';
import { LanguageBarComponent } from './language-bar/language-bar.component';
import { NgMarqueeModule } from 'ng-marquee';

@NgModule({
  declarations: [KioskComponent, IndexComponent, KioskEndComponent, KioskHomeComponent, KioskProductDetailsComponent, KioskProductDetailNoteComponent, KioskTenantCategoryComponent, KioskTenantNameComponent, KioskCategoryOutsideComponent, KioskDealsComponent, KioskTenantListComponent, KioskSearchComponent, KioskCartComponent, BrandsComponent, BrandCatalogueComponent, ProductsComponent, ProductDetailComponent, TagComponent, ComboDetailsComponent, CartComponent, CartButtonComponent, ThankYouComponent, HeaderComponent, AllProductsComponent, MainPageComponent, SearchCategoryComponent, ProductCardComponent, SearchProductComponent, QueueListComponent, CartDisplayComponent, BrandProductsComponent, OrderCompletedComponent, ComboDisplayComponent, KioskTagDisplayComponent, LanguageComponent, LanguageBarComponent],
  imports: [CommonModule, KioskRoutingModule, SharedModule, NgMarqueeModule],
  providers: [ConfigService, CartService, QzTrayService],
  entryComponents: [SearchProductComponent, CartDisplayComponent]
})
export class KioskModule { }

import { LanguageComponent } from './language/language.component';
import { OrderCompletedComponent } from './order-completed/order-completed.component';
import { BrandProductsComponent } from './brand-products/brand-products.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { BrandsComponent } from './brands/brands.component';
import { KioskComponent } from './kiosk/kiosk.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { BrandCatalogueComponent } from './brand-catalogue/brand-catalogue.component';
import { QueueListComponent } from './queue-list/queue-list.component';
import { LanguageBarComponent } from './language-bar/language-bar.component';
import { SettingResolverService } from 'app/_services/customer/setting-resolver.service';

const routes: Routes = [
  {
    path: 'queue',
    component: QueueListComponent,
    resolve: { settings: SettingResolverService }
  },
  {
    path: 'end',
    component: KioskEndComponent,
    resolve: { settings: SettingResolverService }
  },
  {
    path: 'home',
    component: KioskHomeComponent,
    resolve: { settings: SettingResolverService }
  },
  {
    path: 'product-details',
    component: KioskProductDetailsComponent,
    resolve: { settings: SettingResolverService }
  },
  {
    path: 'product-detail-note',
    component: KioskProductDetailNoteComponent,
    resolve: { settings: SettingResolverService }
  },
  {
    path: 'tenant-category',
    component: KioskTenantCategoryComponent,
    resolve: { settings: SettingResolverService }
  },
  {
    path: 'tenant-name',
    component: KioskTenantNameComponent,
    resolve: { settings: SettingResolverService }
  },
  {
    path: 'category-outside',
    component: KioskCategoryOutsideComponent,
    resolve: { settings: SettingResolverService }
  },
  {
    path: 'deals',
    component: KioskDealsComponent,
    resolve: { settings: SettingResolverService }
  },
  {
    path: 'tenant-list',
    component: KioskTenantListComponent,
    resolve: { settings: SettingResolverService }
  },
  {
    path: 'search',
    component: KioskSearchComponent,
    resolve: { settings: SettingResolverService }
  },

  {
    path: 'uuid/:uuid/location/:locationId/queue',
    component: QueueListComponent,
    resolve: { settings: SettingResolverService }
  },
  {
    path: 'uuid/:uuid/location/:locationId/ticket/:ticketId/order-completed',
    component: OrderCompletedComponent,
    resolve: { settings: SettingResolverService }
  },
  {
    path: 'uuid/:uuid/location/:locationId/thank-you',
    component: ThankYouComponent,
    resolve: { settings: SettingResolverService }
  },
  {
    path: 'uuid/:uuid/location/:locationId/cart',
    component: CartComponent,
    resolve: { settings: SettingResolverService }
  },
  {
    path:
      'uuid/:uuid/location/:locationId/brands/:brandMenuId/catalogue/:menuId/product/:productId',
    component: ProductDetailComponent,
    resolve: { settings: SettingResolverService }
  },
  {
    path:
      'uuid/:uuid/location/:locationId/brands/:brandMenuId/catalogue/:menuId/list',
    component: ProductsComponent,
    resolve: { settings: SettingResolverService }
  },
  {
    path: 'uuid/:uuid/location/:locationId/brands/:brandMenuId/catalogue',
    component: BrandCatalogueComponent,
    resolve: { settings: SettingResolverService }
  },
  // {
  //   path: 'uuid/:uuid/location/:locationId/brands/:brandMenuId/products',
  //   component: BrandProductsComponent
  // },
  {
    path: 'uuid/:uuid/location/:locationId/catalogue/brands/:brandMenuId',
    component: AllProductsComponent,
    resolve: { settings: SettingResolverService }
  },
  {
    path: 'uuid/:uuid/location/:locationId/catalogue',
    component: AllProductsComponent,
    resolve: { settings: SettingResolverService }
  },
  {
    path: 'uuid/:uuid/location/:locationId/brands',
    component: BrandsComponent,
    resolve: { settings: SettingResolverService }
  },
  {
    path: 'uuid/:uuid/location/:locationId/type',
    component: MainPageComponent,
    resolve: { settings: SettingResolverService }
  },
  {
    path: 'uuid/:uuid/location/:locationId/languages',
    component: LanguageComponent,
    resolve: { settings: SettingResolverService }
  },
  {
    path: 'uuid/:uuid/location/:locationId',
    component: IndexComponent,
    resolve: { settings: SettingResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KioskRoutingModule { }

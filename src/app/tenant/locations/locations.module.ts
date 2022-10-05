import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from './locations/locations.component';
import { LocationComponent } from './location/location.component';
import { SharedModule } from 'app/shared/shared.module';
import { BrandItemsComponent } from './_modals/brand-items/brand-items.component';
import { PricesComponent } from './prices/prices.component';
import { AddPriceComponent } from './_modals/add-price/add-price.component';

@NgModule({
  declarations: [LocationsComponent, LocationComponent, BrandItemsComponent, PricesComponent, AddPriceComponent],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    SharedModule
  ],
  entryComponents: [BrandItemsComponent, AddPriceComponent]
})
export class LocationsModule { }

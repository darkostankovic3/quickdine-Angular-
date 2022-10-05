import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing.module';
import { BrandsComponent } from './brands/brands.component';
import { BrandComponent } from './brand/brand.component';
import { SharedModule } from 'app/shared/shared.module';
import { NouisliderModule } from 'ng2-nouislider';
import { SliderModule } from 'primeng/slider';

@NgModule({
  declarations: [BrandsComponent, BrandComponent],
  imports: [
    CommonModule,
    BrandsRoutingModule,
    SharedModule,
    NouisliderModule,
    SliderModule
  ]
})
export class BrandsModule { }

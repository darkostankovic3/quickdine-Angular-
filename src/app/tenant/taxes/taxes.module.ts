import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxesRoutingModule } from './taxes-routing.module';
import { TaxesComponent } from './taxes/taxes.component';
import { TaxComponent } from './tax/tax.component';

@NgModule({
  declarations: [TaxesComponent, TaxComponent],
  imports: [
    CommonModule,
    TaxesRoutingModule,
    SharedModule
  ]
})
export class TaxesModule { }

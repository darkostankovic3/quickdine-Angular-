import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantsRoutingModule } from './tenants-routing.module';
import { TenantsComponent } from './tenants/tenants.component';
import { TenantComponent } from './tenant/tenant.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [TenantsComponent, TenantComponent],
  imports: [
    CommonModule,
    TenantsRoutingModule,
    SharedModule
  ]
})
export class TenantsModule { }

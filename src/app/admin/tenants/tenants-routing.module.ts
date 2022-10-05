import { TenantComponent } from './tenant/tenant.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenantsComponent } from './tenants/tenants.component';

const routes: Routes = [
  {
    path: 'add',
    component: TenantComponent,
    data: { title: 'Add Tenant' }
  },
  {
    path: 'edit/:id',
    component: TenantComponent,
    data: { title: 'Edit Tenant' }
  },
  {
    path: '',
    component: TenantsComponent,
    data: { title: 'All Tenants' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantsRoutingModule { }

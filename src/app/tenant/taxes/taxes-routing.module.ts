import { TaxComponent } from './tax/tax.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaxesComponent } from './taxes/taxes.component';

const routes: Routes = [
  {
    path: 'add',
    component: TaxComponent,
    data: { title: 'Add Tax' }
  },
  {
    path: 'edit/:id',
    component: TaxComponent,
    data: { title: 'Edit Tax' }
  },
  {
    path: '',
    component: TaxesComponent,
    data: { title: 'Taxes' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxesRoutingModule { }

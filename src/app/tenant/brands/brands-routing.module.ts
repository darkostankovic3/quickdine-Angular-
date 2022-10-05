import { BrandsComponent } from './brands/brands.component';
import { BrandComponent } from './brand/brand.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'add',
    component: BrandComponent,
    data: { title: 'Add Brand' }
  },
  {
    path: 'edit/:id',
    component: BrandComponent,
    data: { title: 'Edit Brand' }
  },
  {
    path: '',
    component: BrandsComponent,
    data: { title: 'Brands' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule { }

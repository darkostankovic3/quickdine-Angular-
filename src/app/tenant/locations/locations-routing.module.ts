import { LocationsComponent } from './locations/locations.component';
import { LocationComponent } from './location/location.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PricesComponent } from './prices/prices.component';

const routes: Routes = [
  {
    path: 'add',
    component: LocationComponent,
    data: { title: 'Add Location' }
  },
  {
    path: 'edit/:id',
    component: LocationComponent,
    data: { title: 'Edit Location' }
  },
  {
    path: 'price/:brandLocationId',
    component: PricesComponent,
    data: { title: 'Product Price' }
  },
  {
    path: '',
    component: LocationsComponent,
    data: { title: 'All Locations' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule { }

import { CountriesComponent } from './countries/countries.component';
import { CountryComponent } from './country/country.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'add',
    component: CountryComponent,
    data: { title: 'Add Country' }
  },
  {
    path: 'edit/:id',
    component: CountryComponent,
    data: { title: 'Edit Country' }
  },
  {
    path: '',
    component: CountriesComponent,
    data: { title: 'All Countries' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule { }

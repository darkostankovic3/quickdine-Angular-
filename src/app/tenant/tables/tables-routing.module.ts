import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { TablesComponent } from './tables/tables.component';

const routes: Routes = [
  {
    path: 'add',
    component: TableComponent,
    data: { title: 'Add Booking Table' }
  },
  {
    path: 'edit/:id',
    component: TableComponent,
    data: { title: 'Edit Booking Table' }
  },
  {
    path: '',
    component: TablesComponent,
    data: { title: 'All Booking Tables' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }

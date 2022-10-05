import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentComponent } from './department/department.component';

const routes: Routes = [
  {
    path: '',
    component: DepartmentsComponent,
    data: { title: 'Department' }
  },
  {
    path: 'edit/:id',
    component: DepartmentComponent,
    data: { title: 'Edit Department' }
  },
  {
    path: 'add',
    component: DepartmentComponent,
    data: { title: 'Add Department' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }

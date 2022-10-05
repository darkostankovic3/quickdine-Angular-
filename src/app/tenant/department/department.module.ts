import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentComponent } from './department/department.component';
import { DepartmentsComponent } from './departments/departments.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [DepartmentComponent, DepartmentsComponent],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    SharedModule
  ]
})
export class DepartmentModule { }

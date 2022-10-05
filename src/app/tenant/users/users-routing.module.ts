import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'add',
    component: UserComponent,
    data: { title: 'Add User' }
  },
  {
    path: '',
    component: UsersComponent,
    data: { title: 'All Users' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

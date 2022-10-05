import { LoginAsComponent } from './../../shared/login-as/login-as.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login-as',
    component: LoginAsComponent,
    data: { title: 'Login As' }
  },
  {
    path: 'add',
    component: UserComponent,
    data: { title: 'Add User' }
  },
  {
    path: 'edit/:id',
    component: UserComponent,
    data: { title: 'Edit User' }
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

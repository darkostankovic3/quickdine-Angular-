import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CloudinaryComponent } from './cloudinary.component';

const routes: Routes = [
  {
    path: '',
    component: CloudinaryComponent,
    data: { title: 'Cloudinary Settings' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CloudinaryRoutingModule { }

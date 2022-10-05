import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloudinaryRoutingModule } from './cloudinary-routing.module';
import { CloudinaryComponent } from './cloudinary.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [CloudinaryComponent],
  imports: [
    CommonModule,
    CloudinaryRoutingModule,
    SharedModule
  ]
})
export class CloudinaryModule { }

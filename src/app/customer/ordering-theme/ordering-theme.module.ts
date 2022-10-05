import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderingThemeRoutingModule } from './ordering-theme-routing.module';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    OrderingThemeRoutingModule
  ]
})
export class OrderingThemeModule { }

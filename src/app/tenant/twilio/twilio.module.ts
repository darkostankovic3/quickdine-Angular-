import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TwilioRoutingModule } from './twilio-routing.module';
import { TwilioComponent } from './twilio.component';

@NgModule({
  declarations: [TwilioComponent],
  imports: [
    CommonModule,
    TwilioRoutingModule,
    SharedModule
  ]
})
export class TwilioModule { }

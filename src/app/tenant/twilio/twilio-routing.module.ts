import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TwilioComponent } from './twilio.component';

const routes: Routes = [
  {
    path: '',
    component: TwilioComponent,
    data: { title: 'Twilio Settings' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TwilioRoutingModule { }

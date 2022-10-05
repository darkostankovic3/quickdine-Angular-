import { SyncComponent } from './sync/sync.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { ResyncComponent } from './resync/resync.component';

const routes: Routes = [
  {
    path: 'sync',
    component: SyncComponent,
    data: { title: 'Sync Settings' }
  },
  {
    path: 're-sync',
    component: ResyncComponent,
    data: { title: 'Resync' }
  },
  {
    path: '',
    component: SettingsComponent,
    data: { title: 'Settings' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

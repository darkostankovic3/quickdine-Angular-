import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings/settings.component";
import { SharedModule } from "app/shared/shared.module";
import { SyncComponent } from "./sync/sync.component";
import { SyncService } from "app/_services/tenant/sync.service";
import { ResyncComponent } from "./resync/resync.component";
import { ColorPickerModule } from "primeng/colorpicker";

@NgModule({
  declarations: [SettingsComponent, SyncComponent, ResyncComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    ColorPickerModule
  ],
  providers: [SyncService]
})
export class SettingsModule {}

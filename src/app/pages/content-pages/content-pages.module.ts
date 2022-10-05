import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { ContentPagesRoutingModule } from "./content-pages-routing.module";

import { ComingSoonPageComponent } from "./coming-soon/coming-soon-page.component";
import { ErrorPageComponent } from "./error/error-page.component";
import { LockScreenPageComponent } from "./lock-screen/lock-screen-page.component";
import { MaintenancePageComponent } from "./maintenance/maintenance-page.component";


@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule        
    ],
    declarations: [
        ComingSoonPageComponent,
        ErrorPageComponent,
        LockScreenPageComponent,
        MaintenancePageComponent
    ]
})
export class ContentPagesModule { }

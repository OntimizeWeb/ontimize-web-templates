import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';

import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule,
    DashboardRoutingModule,
    MatProgressBarModule,
    MatTooltipModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }

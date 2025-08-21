import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';

import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule,
    DashboardRoutingModule,
    MatProgressBarModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }

import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';

import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { OChartModule } from 'ontimize-web-ngx-charts';

@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule,
    DashboardRoutingModule,
    OChartModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }

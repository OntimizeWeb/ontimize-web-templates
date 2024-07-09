import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { OReportModule } from 'ontimize-web-ngx-report';

import { SharedModule } from '../../shared/shared.module';
import { GridRoutingModule } from './grid-routing.module';
import { GridHomeComponent } from './grid-home/grid-home.component';

@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule,
    GridRoutingModule,
    OReportModule
  ],
  declarations: [GridHomeComponent]
})
export class GridModule { }

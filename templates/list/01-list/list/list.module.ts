import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { OReportModule } from 'ontimize-web-ngx-report';

import { SharedModule } from '../../shared/shared.module';
import { ListRoutingModule } from './list-routing.module';
import { ListHomeComponent } from './list-home/list-home.component';

@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule,
    ListRoutingModule,
    OReportModule
  ],
  declarations: [ListHomeComponent]
})
export class ListModule { }

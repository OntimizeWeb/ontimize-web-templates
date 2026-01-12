import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import { TableHomeComponent } from './table-home/table-home.component';
import { SharedModule } from '../../shared/shared.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';


@NgModule({
  declarations: [
    TableHomeComponent
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    SharedModule,
    OntimizeWebModule
  ]
})
export class TableModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import { TableHomeComponent } from './table-home/table-home.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';


@NgModule({
  declarations: [
    TableHomeComponent
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    OntimizeWebModule
  ]
})
export class TableModule { }

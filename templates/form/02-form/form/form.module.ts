import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormDetailComponent } from './form-detail/form-detail.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';


@NgModule({
  declarations: [
    FormDetailComponent
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    OntimizeWebModule
  ]
})
export class FormModule { }

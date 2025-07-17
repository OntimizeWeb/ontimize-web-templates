import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';

import { SharedModule } from '../../shared/shared.module';
import { FormRoutingModule } from './form-routing.module';
import { FormHomeComponent } from './form-home/form-home.component';

@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule,
    FormRoutingModule
  ],
  declarations: [FormHomeComponent],
})
export class FormModule { }
import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';

import { SharedModule } from '../../shared/shared.module';
import { FormRoutingModule } from './form-routing.module';
import { FormDetailComponent } from './form-detail/form-detail.component';

@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule,
    FormRoutingModule
  ],
  declarations: [FormDetailComponent],
})
export class FormModule { }
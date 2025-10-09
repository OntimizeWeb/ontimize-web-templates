import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormDetailComponent } from './form-detail/form-detail.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { HotelService } from '../../shared/services/hotel.service.ts';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    FormDetailComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormRoutingModule,
    OntimizeWebModule
  ],
  providers: [{
    provide: 'hotels',
    useValue: HotelService
  }]
})
export class FormModule { }

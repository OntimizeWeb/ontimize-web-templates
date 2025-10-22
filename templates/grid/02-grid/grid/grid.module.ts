import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OntimizeWebModule } from 'ontimize-web-ngx';
import { SharedModule } from '../../shared/shared.module';
import { GridComponent } from './grid.component';
import { GridRoutingModule } from './grid-routing.module';
import { PacksService } from '../../shared/services/packs.service';

@NgModule({
  declarations: [
    GridComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    GridRoutingModule,
    OntimizeWebModule
  ],
  providers: [{
    provide: 'packs',
    useValue: PacksService
  }
  ]
})
export class GridModule { }

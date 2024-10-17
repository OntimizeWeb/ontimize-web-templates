import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';

import { SharedModule } from '../../shared/shared.module';
import { GridRoutingModule } from './grid-routing.module';
import { GridHomeComponent } from './grid-home/grid-home.component';

@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule,
    GridRoutingModule
  ],
  declarations: [GridHomeComponent]
})
export class GridModule { }

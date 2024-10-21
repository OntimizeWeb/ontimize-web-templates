import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';

import { SharedModule } from '../../shared/shared.module';
import { GridRoutingModule } from './grid-routing.module';
import { GridHomeComponent } from './grid-home/grid-home.component';
import { DummyService } from '../assets/dummy.service';

@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule,
    GridRoutingModule
  ],
  declarations: [GridHomeComponent],
  providers: [DummyService]
})
export class GridModule { }

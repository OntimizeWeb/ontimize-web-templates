import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridHomeComponent } from './grid-home/grid-home.component';

const routes: Routes = [
  { path: '', component: GridHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GridRoutingModule { }

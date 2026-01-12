import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormDetailComponent } from './form-detail/form-detail.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'hotel/1' },
  { path: 'hotel/:id', component: FormDetailComponent },
  { path: '**', redirectTo: 'hotel/1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }

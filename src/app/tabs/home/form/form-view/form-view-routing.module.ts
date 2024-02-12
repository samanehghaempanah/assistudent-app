import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormViewPage } from './form-view.page';

const routes: Routes = [
  {
    path: '',
    component: FormViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormViewPageRoutingModule {}

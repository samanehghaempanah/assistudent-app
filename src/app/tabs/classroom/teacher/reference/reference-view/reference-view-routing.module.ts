import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReferenceViewPage } from './reference-view.page';

const routes: Routes = [
  {
    path: '',
    component: ReferenceViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferenceViewPageRoutingModule {}

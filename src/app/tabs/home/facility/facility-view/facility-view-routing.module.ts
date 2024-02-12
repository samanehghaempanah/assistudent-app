import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacilityViewPage } from './facility-view.page';

const routes: Routes = [
  {
    path: '',
    component: FacilityViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacilityViewPageRoutingModule {}

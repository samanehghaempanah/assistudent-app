import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacilityListPage } from './facility-list.page';

const routes: Routes = [
  {
    path: '',
    component: FacilityListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacilityListPageRoutingModule {}

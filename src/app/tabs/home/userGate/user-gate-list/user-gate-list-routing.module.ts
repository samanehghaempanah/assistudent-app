import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserGateListPage } from './user-gate-list.page';

const routes: Routes = [
  {
    path: '',
    component: UserGateListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserGateListPageRoutingModule {}

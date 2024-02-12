import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisaListPage } from './visa-list.page';

const routes: Routes = [
  {
    path: '',
    component: VisaListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisaListPageRoutingModule {}

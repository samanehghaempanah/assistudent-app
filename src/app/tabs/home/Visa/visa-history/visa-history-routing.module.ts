import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisaHistoryPage } from './visa-history.page';

const routes: Routes = [
  {
    path: '',
    component: VisaHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisaHistoryPageRoutingModule {}

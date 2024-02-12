import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisaViewPage } from './visa-view.page';

const routes: Routes = [
  {
    path: '',
    component: VisaViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisaViewPageRoutingModule {}

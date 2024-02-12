import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookletViewPage } from './booklet-view.page';

const routes: Routes = [
  {
    path: '',
    component: BookletViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookletViewPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookletListPage } from './booklet-list.page';

const routes: Routes = [
  {
    path: '',
    component: BookletListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookletListPageRoutingModule {}

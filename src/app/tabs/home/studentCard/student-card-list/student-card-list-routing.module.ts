import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentCardListPage } from './student-card-list.page';

const routes: Routes = [
  {
    path: '',
    component: StudentCardListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentCardListPageRoutingModule {}

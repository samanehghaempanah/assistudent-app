import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserGateListPageRoutingModule } from './user-gate-list-routing.module';

import { UserGateListPage } from './user-gate-list.page';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { SearchComponentModule } from 'src/app/components/search/search.module';
import { sharedPipeModule } from 'src/app/definitions/pipes/shared-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserGateListPageRoutingModule,
    PageHeaderComponentModule,
    SearchComponentModule,
    sharedPipeModule
  ],
  declarations: [UserGateListPage]
})
export class UserGateListPageModule {}

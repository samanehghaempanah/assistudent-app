import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FacilityListPageRoutingModule } from './facility-list-routing.module';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { FacilityListPage } from './facility-list.page';
import { ScrollableTabComponentModule } from 'src/app/components/scrollable-tab/scrollable-tab.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageHeaderComponentModule,
    FacilityListPageRoutingModule,
    ScrollableTabComponentModule
  ],
  declarations: [FacilityListPage]
})
export class FacilityListPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { sharedPipeModule } from 'src/app/definitions/pipes/shared-pipe.module';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { ScrollableTabComponentModule } from 'src/app/components/scrollable-tab/scrollable-tab.module';
import { VisaListPageRoutingModule } from './visa-list-routing.module';
import { VisaViewPageModule } from '../visa-view/visa-view.module';
import { VisaHistoryPageModule } from '../visa-history/visa-history.module';
import { VisaListPage } from './visa-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    sharedPipeModule,
    PageHeaderComponentModule,
    ScrollableTabComponentModule,
    VisaListPageRoutingModule,
    VisaViewPageModule,
    VisaHistoryPageModule,
  ],
  declarations: [VisaListPage]
})
export class VisaListPageModule {}

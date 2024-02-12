import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { sharedPipeModule } from 'src/app/definitions/pipes/shared-pipe.module';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { ScrollableTabComponentModule } from 'src/app/components/scrollable-tab/scrollable-tab.module';
import { VisaHistoryPageRoutingModule } from './visa-history-routing.module';
import { VisaHistoryPage } from './visa-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    sharedPipeModule,
    PageHeaderComponentModule,
    ScrollableTabComponentModule,
    VisaHistoryPageRoutingModule,
  ],
  declarations: [VisaHistoryPage],
  exports: [
    VisaHistoryPage
  ]
})
export class VisaHistoryPageModule {}

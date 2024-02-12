import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { sharedPipeModule } from 'src/app/definitions/pipes/shared-pipe.module';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { ScrollableTabComponentModule } from 'src/app/components/scrollable-tab/scrollable-tab.module';
import { SearchComponentModule } from 'src/app/components/search/search.module';
import { OfferListPageRoutingModule } from './offer-list-routing.module';
import { OfferListPage } from './offer-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    sharedPipeModule,
    PageHeaderComponentModule,
    ScrollableTabComponentModule,
    SearchComponentModule,
    OfferListPageRoutingModule,
  ],
  declarations: [OfferListPage]
})
export class OfferListPageModule {}

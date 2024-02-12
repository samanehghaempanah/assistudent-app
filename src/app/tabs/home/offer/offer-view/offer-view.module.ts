import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { sharedPipeModule } from 'src/app/definitions/pipes/shared-pipe.module';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { OfferViewPageRoutingModule } from './offer-view-routing.module';
import { OfferViewPage } from './offer-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    sharedPipeModule,
    PageHeaderComponentModule,
    OfferViewPageRoutingModule,
  ],
  declarations: [OfferViewPage]
})
export class OfferViewPageModule {}

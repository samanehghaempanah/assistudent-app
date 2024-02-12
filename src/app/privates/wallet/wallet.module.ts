import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletPageRoutingModule } from './wallet-routing.module';

import { WalletPage } from './wallet.page';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { ScrollableTabComponentModule } from 'src/app/components/scrollable-tab/scrollable-tab.module';
import { sharedPipeModule } from 'src/app/definitions/pipes/shared-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletPageRoutingModule,
    ScrollableTabComponentModule,
    PageHeaderComponentModule,
    sharedPipeModule
  ],
  declarations: [WalletPage]
})
export class WalletPageModule {}

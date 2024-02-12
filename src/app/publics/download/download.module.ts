import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DownloadPageRoutingModule } from './download-routing.module';

import { DownloadPage } from './download.page';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DownloadPageRoutingModule,
    PageHeaderComponentModule
  ],
  declarations: [DownloadPage]
})
export class DownloadPageModule {}

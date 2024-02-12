import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { sharedPipeModule } from 'src/app/definitions/pipes/shared-pipe.module';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { ScrollableTabComponentModule } from 'src/app/components/scrollable-tab/scrollable-tab.module';
import {FileUploaderModule } from 'src/app/components/file-uploader/file-uploader.module';
import { VisaViewPageRoutingModule } from './visa-view-routing.module';
import { VisaViewPage } from './visa-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    sharedPipeModule,
    PageHeaderComponentModule,
    ScrollableTabComponentModule,
    FileUploaderModule,
    VisaViewPageRoutingModule,
  ],
  declarations: [VisaViewPage],
  exports: [
    VisaViewPage
  ]
})
export class VisaViewPageModule {}

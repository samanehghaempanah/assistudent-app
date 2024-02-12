import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { sharedPipeModule } from 'src/app/definitions/pipes/shared-pipe.module';
import { IframePageRoutingModule } from './iframe-routing.module';
import { IframePage } from './iframe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageHeaderComponentModule,
    sharedPipeModule,
    IframePageRoutingModule
  ],
  declarations: [IframePage]
})
export class IframePageModule { }

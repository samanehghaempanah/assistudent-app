import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { sharedPipeModule } from 'src/app/definitions/pipes/shared-pipe.module';
import { ChatViewPageRoutingModule } from './chat-view-routing.module';
import { ChatViewPage } from './chat-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageHeaderComponentModule,
    ChatViewPageRoutingModule,
    sharedPipeModule
  ],
  declarations: [ChatViewPage]
})
export class ChatViewPageModule { }

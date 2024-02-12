import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { ChatListPageRoutingModule } from './chat-list-routing.module';
import { ChatListPage } from './chat-list.page';
import { sharedPipeModule } from 'src/app/definitions/pipes/shared-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageHeaderComponentModule,
    ChatListPageRoutingModule,
    sharedPipeModule
  ],
  declarations: [ChatListPage]
})
export class ChatListPageModule {}

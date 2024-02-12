import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NotificationViewPageRoutingModule } from './notification-view-routing.module';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { NotificationViewPage } from './notification-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageHeaderComponentModule,
    NotificationViewPageRoutingModule
  ],
  declarations: [NotificationViewPage]
})
export class NotificationViewPageModule {}

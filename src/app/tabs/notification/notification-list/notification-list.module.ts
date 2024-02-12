import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ImageViewerComponentModule } from 'src/app/components/image-viewer/image-viewer.module';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { ScrollableTabComponentModule } from 'src/app/components/scrollable-tab/scrollable-tab.module';
import { SearchComponentModule } from 'src/app/components/search/search.module';
import { sharedPipeModule } from 'src/app/definitions/pipes/shared-pipe.module';
import { NotificationListPageRoutingModule } from './notification-list-routing.module';
import { NotificationListPage } from './notification-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    sharedPipeModule,
    PageHeaderComponentModule,
    ImageViewerComponentModule,
    ScrollableTabComponentModule,
    NotificationListPageRoutingModule,
    SearchComponentModule
  ],
  declarations: [NotificationListPage]
})
export class NotificationListPageModule {}

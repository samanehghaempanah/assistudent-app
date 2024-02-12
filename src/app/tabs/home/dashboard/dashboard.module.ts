import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListMenuModule } from 'src/app/components/list-menu/list-menu.module';
import { CarouselModule } from 'src/app/components/carousel/carousel.module';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { ScrollableTabComponentModule } from 'src/app/components/scrollable-tab/scrollable-tab.module';
import { SliderComponentModule } from 'src/app/components/slider/slider.module';
import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';
import { NewsModule } from 'src/app/components/news/news.module';
import { NotificationModule } from 'src/app/components/notification/notification.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageHeaderComponentModule,
    SliderComponentModule,
    ScrollableTabComponentModule,
    DashboardPageRoutingModule,
    ListMenuModule,
    NewsModule,
    NotificationModule,
    CarouselModule
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}

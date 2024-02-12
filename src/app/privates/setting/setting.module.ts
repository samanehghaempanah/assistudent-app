import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { ScrollableTabComponentModule } from 'src/app/components/scrollable-tab/scrollable-tab.module';
import { SettingPageRoutingModule } from './setting-routing.module';
import { SettingPage } from './setting.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SettingPageRoutingModule, PageHeaderComponentModule, ScrollableTabComponentModule],
  declarations: [SettingPage],
})
export class SettingPageModule {}

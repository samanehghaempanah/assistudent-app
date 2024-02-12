import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutPageRoutingModule } from './about-routing.module';

import { AboutPage } from './about.page';
import { ScrollableTabComponentModule } from 'src/app/components/scrollable-tab/scrollable-tab.module';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutPageRoutingModule,
    PageHeaderComponentModule,
    ScrollableTabComponentModule
  ],
  declarations: [AboutPage]
})
export class AboutPageModule {}

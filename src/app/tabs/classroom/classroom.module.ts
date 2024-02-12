import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassroomPageRoutingModule } from './classroom-routing.module';

import { ClassroomPage } from './classroom.page';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { ScrollableTabComponentModule } from 'src/app/components/scrollable-tab/scrollable-tab.module';
import { sharedPipeModule } from 'src/app/definitions/pipes/shared-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassroomPageRoutingModule,
    PageHeaderComponentModule,
    ScrollableTabComponentModule,
    sharedPipeModule
  ],
  declarations: [ClassroomPage]
})
export class ClassroomPageModule {}

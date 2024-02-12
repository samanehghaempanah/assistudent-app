import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormListPageRoutingModule } from './form-list-routing.module';

import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { ScrollableTabComponentModule } from 'src/app/components/scrollable-tab/scrollable-tab.module';
import { sharedPipeModule } from 'src/app/definitions/pipes/shared-pipe.module';
import { FormListPage } from './form-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormListPageRoutingModule,
    sharedPipeModule,
    PageHeaderComponentModule,
    ScrollableTabComponentModule,
  ],
  declarations: [FormListPage]
})
export class FormListPageModule {}

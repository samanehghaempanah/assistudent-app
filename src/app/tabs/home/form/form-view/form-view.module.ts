import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormViewPageRoutingModule } from './form-view-routing.module';

import { DatePickerEnComponentModule } from 'src/app/components/datepicker-english/datepickeren.module';
import { DatePickerFaComponentModule } from 'src/app/components/datepicker-persian/datepickerfa.module';
import { FileUploaderModule } from 'src/app/components/file-uploader/file-uploader.module';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { ScrollableTabComponentModule } from 'src/app/components/scrollable-tab/scrollable-tab.module';
import { sharedPipeModule } from 'src/app/definitions/pipes/shared-pipe.module';
import { FormViewPage } from './form-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormViewPageRoutingModule,
    sharedPipeModule,
    PageHeaderComponentModule,
    ScrollableTabComponentModule,
    FileUploaderModule,
    DatePickerFaComponentModule,
    DatePickerEnComponentModule,
  ],
  declarations: [FormViewPage]
})
export class FormViewPageModule { }

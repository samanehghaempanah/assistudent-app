import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IonicModule } from '@ionic/angular';
import { DatePickerEnComponentModule } from 'src/app/components/datepicker-english/datepickeren.module';
import { DatePickerFaComponentModule } from 'src/app/components/datepicker-persian/datepickerfa.module';
import { FileUploaderModule } from 'src/app/components/file-uploader/file-uploader.module';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { PdfViewerComponentModule } from 'src/app/components/pdf-viewer/pdf-viewer.module';
import { ScrollableTabComponentModule } from 'src/app/components/scrollable-tab/scrollable-tab.module';
import { SearchComponentModule } from 'src/app/components/search/search.module';
import { SelectBoxComponentModule } from 'src/app/components/select-box/select-box.module';
import { sharedPipeModule } from 'src/app/definitions/pipes/shared-pipe.module';
import { BookletListPageRoutingModule } from './booklet-list-routing.module';
import { BookletListPage } from './booklet-list.page';
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookletListPageRoutingModule,
    PageHeaderComponentModule,
    ScrollableTabComponentModule,
    sharedPipeModule,
    SearchComponentModule,
    MatIconModule,
    DatePickerFaComponentModule,
    DatePickerEnComponentModule,
    FileUploaderModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
    PdfViewerComponentModule,
    SelectBoxComponentModule,
    NgApexchartsModule
  ],
  declarations: [BookletListPage],
})
export class BookletListPageModule { }

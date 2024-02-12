import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BookletViewPageRoutingModule } from './booklet-view-routing.module';
import { BookletViewPage } from './booklet-view.page';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { sharedPipeModule } from 'src/app/definitions/pipes/shared-pipe.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookletViewPageRoutingModule,
    PageHeaderComponentModule,
    sharedPipeModule,
    NgxExtendedPdfViewerModule
  ],
  declarations: [BookletViewPage]
})
export class BookletViewPageModule { }

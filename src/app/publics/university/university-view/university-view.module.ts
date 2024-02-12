import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UniversityViewPageRoutingModule } from './university-view-routing.module';
import { UniversityViewPage } from './university-view.page';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { ScrollableTabComponentModule } from 'src/app/components/scrollable-tab/scrollable-tab.module';
import { sharedPipeModule } from 'src/app/definitions/pipes/shared-pipe.module';
import { PdfViewerComponentModule } from 'src/app/components/pdf-viewer/pdf-viewer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UniversityViewPageRoutingModule,
    PageHeaderComponentModule,
    ScrollableTabComponentModule,
    sharedPipeModule,
    PdfViewerComponentModule
  ],
  declarations: [UniversityViewPage]
})
export class UniversityViewPageModule {}

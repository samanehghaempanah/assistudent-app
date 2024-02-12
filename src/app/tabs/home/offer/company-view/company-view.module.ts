import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { sharedPipeModule } from 'src/app/definitions/pipes/shared-pipe.module';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { CompanyViewPageRoutingModule } from './company-view-routing.module';
import { CompanyViewPage } from './company-view.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    sharedPipeModule,
    PageHeaderComponentModule,
    CompanyViewPageRoutingModule,
  ],
  declarations: [CompanyViewPage]
})
export class CompanyViewPageModule {}

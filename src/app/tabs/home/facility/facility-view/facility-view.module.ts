import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FacilityViewPageRoutingModule } from './facility-view-routing.module';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { FacilityViewPage } from './facility-view.page';
import { CarouselModule } from 'src/app/components/carousel/carousel.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarouselModule,
    PageHeaderComponentModule,
    FacilityViewPageRoutingModule
  ],
  declarations: [FacilityViewPage]
})
export class FacilityViewPageModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlacesPageRoutingModule } from './places-routing.module';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { ScrollableTabComponentModule } from 'src/app/components/scrollable-tab/scrollable-tab.module';
import { SearchComponentModule } from 'src/app/components/search/search.module';
import { PlacesPage } from './places.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageHeaderComponentModule,
    PlacesPageRoutingModule,
    ScrollableTabComponentModule,
    SearchComponentModule,
  ],
  declarations: [PlacesPage]
})
export class PlacesPageModule {}

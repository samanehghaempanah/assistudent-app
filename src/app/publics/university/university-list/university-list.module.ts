import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { UniversityListPageRoutingModule } from './university-list-routing.module';
import { UniversityListPage } from './university-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UniversityListPageRoutingModule,
    PageHeaderComponentModule,
    MatIconModule
  ],
  declarations: [UniversityListPage]
})
export class UniversityListPageModule {}

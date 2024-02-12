import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PageHeaderComponent } from './page-header.component';
import { ListMenuModule } from '../list-menu/list-menu.module';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, ListMenuModule,],
  declarations: [PageHeaderComponent],
  exports: [PageHeaderComponent]
})
export class PageHeaderComponentModule {}

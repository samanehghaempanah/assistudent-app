import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { IonicModule } from '@ionic/angular';
import { sharedPipeModule } from 'src/app/definitions/pipes/shared-pipe.module';

@NgModule({
  declarations: [NewsComponent],
  imports: [CommonModule, IonicModule, sharedPipeModule],
  exports: [NewsComponent],
})
export class NewsModule {}

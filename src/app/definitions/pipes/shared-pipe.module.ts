
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { jDatePipe } from './jdate.pipe';
import { ToRialPipe } from './rial.pipe';
import { SafeURLPipe } from './safeurl.pipe';
import { FormatTimePipe } from './timer.pipe';

@NgModule({
  declarations: [jDatePipe, SafeURLPipe, ToRialPipe, FormatTimePipe],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [jDatePipe, SafeURLPipe, ToRialPipe, FormatTimePipe]
})

export class sharedPipeModule { }

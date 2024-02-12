import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScrollableTabComponent } from './scrollable-tab.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule], 
  declarations: [ScrollableTabComponent],
  exports: [ScrollableTabComponent]
})
export class ScrollableTabComponentModule {}

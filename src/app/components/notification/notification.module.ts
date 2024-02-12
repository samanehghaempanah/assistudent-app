import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationComponent } from './notification.component';

import {MatExpansionModule} from '@angular/material/expansion';
import { sharedPipeModule } from 'src/app/definitions/pipes/shared-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatExpansionModule,
    sharedPipeModule
  ],
  declarations: [NotificationComponent],
  exports: [
    NotificationComponent
  ]
})
export class NotificationModule {}

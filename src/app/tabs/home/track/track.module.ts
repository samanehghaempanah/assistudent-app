import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackPageRoutingModule } from './track-routing.module';

import { TrackPage } from './track.page';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { MatStepperModule } from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import { sharedPipeModule } from 'src/app/definitions/pipes/shared-pipe.module';
import { DayOfWeekPipe } from 'src/app/definitions/pipes/day-of-week.pipe';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackPageRoutingModule,
    PageHeaderComponentModule,
    MatStepperModule,
    MatSelectModule,
    ReactiveFormsModule,
    sharedPipeModule,
    MatIconModule
  ],
  declarations: [TrackPage , DayOfWeekPipe]
})
export class TrackPageModule { }

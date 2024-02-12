import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { sharedPipeModule } from 'src/app/definitions/pipes/shared-pipe.module';
import { SwiperModule } from 'swiper/angular';
import { DatePickerFaComponentModule } from 'src/app/components/datepicker-persian/datepickerfa.module';
import { DatePickerEnComponentModule } from 'src/app/components/datepicker-english/datepickeren.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    sharedPipeModule,
    SwiperModule,
    DatePickerFaComponentModule,
    DatePickerEnComponentModule,
    ReactiveFormsModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}

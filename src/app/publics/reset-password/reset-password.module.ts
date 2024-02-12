import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetPasswordPageRoutingModule } from './reset-password-routing.module';

import { ResetPasswordPage } from './reset-password.page';
import { sharedPipeModule } from 'src/app/definitions/pipes/shared-pipe.module';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetPasswordPageRoutingModule,
    ReactiveFormsModule,
    sharedPipeModule,
    SwiperModule
  ],
  declarations: [ResetPasswordPage]
})
export class ResetPasswordPageModule {}

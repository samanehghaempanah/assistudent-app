import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { sharedPipeModule } from 'src/app/definitions/pipes/shared-pipe.module';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';
import { DatePickerEnComponentModule } from 'src/app/components/datepicker-english/datepickeren.module';
import { DatePickerFaComponentModule } from 'src/app/components/datepicker-persian/datepickerfa.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    sharedPipeModule,
    PageHeaderComponentModule,
    ProfilePageRoutingModule,
    ReactiveFormsModule,
    DatePickerFaComponentModule,
    DatePickerEnComponentModule,
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}

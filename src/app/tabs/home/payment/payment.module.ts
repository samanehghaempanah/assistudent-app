import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentPageRoutingModule } from './payment-routing.module';

import { PaymentPage } from './payment.page';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { sharedPipeModule } from 'src/app/definitions/pipes/shared-pipe.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentPageRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PageHeaderComponentModule,
    MatStepperModule,
    MatSelectModule,
    ReactiveFormsModule,
    sharedPipeModule,
    MatIconModule
  ],
  declarations: [PaymentPage]
})
export class PaymentPageModule {}

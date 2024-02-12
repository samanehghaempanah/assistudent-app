import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { IonicModule } from '@ionic/angular';
import { DatepickerfaComponent } from './datepickerfa.component';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from "@angular/material/core";

import { MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS } from "src/app/material.persian-date.adapter";

@NgModule({
  imports: [CommonModule,
    FormsModule,
    IonicModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS }
  ],
  declarations: [DatepickerfaComponent],
  exports: [DatepickerfaComponent]
})
export class DatePickerFaComponentModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { IonicModule } from '@ionic/angular';
import { DatepickerenComponent } from './datepickeren.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

export const DATE_FORMATS = {
  parse: {
    dateInput: "YYYY/MM/DD"
  },
  display: {
    dateInput: "YYYY/MM/DD",
    monthYearLabel: "YYYY MMMM",
    dateA11yLabel: "YYYY/MM/DD",
    monthYearA11yLabel: "YYYY MMMM"
  }
};

@NgModule({
  imports: [CommonModule,
    FormsModule,
    IonicModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  declarations: [DatepickerenComponent],
  exports: [DatepickerenComponent]
})
export class DatePickerEnComponentModule {

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB');
  }

}

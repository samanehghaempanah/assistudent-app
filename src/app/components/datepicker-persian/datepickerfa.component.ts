import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import moment from 'jalali-moment';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'apv-datepickerfa',
  templateUrl: './datepickerfa.component.html',
  styleUrls: ['./datepickerfa.component.scss'],
})
export class DatepickerfaComponent implements OnInit {
  @Input() placeholder: any = '';
  @Output() datepicker = new EventEmitter();

  isModalOpen = false;
  DateValueSelected: any = null;
  DateValue: any = null;

  constructor(public baseService: BaseService) {}
  ngOnInit() { }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  onSetDate(value: any) {
    this.setOpen(false)
    this.DateValueSelected = moment.from(value._d, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
    value.date = moment.from(value._d, "en").utc(true).toJSON();
    this.datepicker.emit(value.date);
  }
}

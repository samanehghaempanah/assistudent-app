import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import moment from 'jalali-moment';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'apv-datepickeren',
  templateUrl: './datepickeren.component.html',
  styleUrls: ['./datepickeren.component.scss'],
})
export class DatepickerenComponent implements OnInit {
  @Input() placeholder: any = '';
  @Output() datepicker = new EventEmitter();

  isModalOpen = false;
  DateValueSelected: any = null;
  DateValue: any = null;

  constructor(public baseService: BaseService) { }
  ngOnInit() { }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  onSet(event: any) {
    this.DateValue = event.detail.value;
  }

  onSetDate(value: any) {
    this.setOpen(false)
    this.DateValueSelected = moment.from(value, 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
    value = moment.from(value, "en").utc(true).toJSON();
    this.datepicker.emit(value);
  }
}

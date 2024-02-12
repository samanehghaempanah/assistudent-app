import { Pipe, PipeTransform } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';

@Pipe({
  name: 'toRial',
})
export class ToRialPipe implements PipeTransform {
  constructor(private baseService: BaseService) {}

  transform(value: number, order: 'first' | 'second'): any {
    let amount: number;
    if (value < 1000000) {
      amount = Math.floor(value / 1000);
      if (order != 'first')
        return this.baseService
          .translate('offer-list-card-salary3')
          .replace('value2', amount.toString());
      else return amount;
    } else {
      amount = Math.floor(value / 1000000);
      if (order != 'first')
        return this.baseService
          .translate('offer-list-card-salary2')
          .replace('value2', amount.toString());
      else return amount;
    }
  }
}

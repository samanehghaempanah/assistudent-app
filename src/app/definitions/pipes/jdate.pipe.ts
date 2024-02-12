import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';
import { BaseService } from 'src/app/services/base.service';

@Pipe({ name: 'jdate' })
export class jDatePipe implements PipeTransform {
    constructor(private baseService: BaseService) { }

    transform(value: string, format: 'datetime' | 'date' | 'time' | 'info' = 'datetime'): any {
        try {
            if (value && parseInt(value.split('/')[0]) > 1700) {
                if (format == 'date') {
                    return moment.from(value, 'YYYY/MM/DD').locale(this.baseService.language().Symbol).format('YYYY/MM/DD');
                } else if (format == 'time') {
                    return moment.from(value, 'YYYY/MM/DD').locale(this.baseService.language().Symbol).format('hh:mm');
                } else if (format == 'datetime') {
                    return moment.from(value, 'YYYY/MM/DD').locale(this.baseService.language().Symbol).format('YYYY/MM/DD hh:mm');
                } else {
                    // let toDay = moment.from(new Date().toString(), 'YYYY/MM/DD').locale(this.baseService.language().Symbol);
                    let theDate = moment.from(value, 'YYYY/MM/DD').locale(this.baseService.language().Symbol);
                    // let dateDiff = toDay.diff(theDate) / 1000;
                    // if (dateDiff <= 10) { return this.baseService.translate('common-jDatePipe-Now'); }
                    // else if (dateDiff / 3600 <= 24) { return this.baseService.translate('common-jDatePipe-Today') + ' - ' + theDate.format('hh:mm'); }
                    // else if (dateDiff / 3600 <= 48) { return this.baseService.translate('common-jDatePipe-Yesterday') + ' - ' + theDate.format('hh:mm'); }
                    // else { return theDate.format('YYYY/MM/DD - hh:mm'); }
                    return theDate.fromNow();
                }
            }
        }
        catch { }
        return value;
    }
}
import { Pipe, PipeTransform } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';

@Pipe({ name: 'dayOfWeek' })
export class DayOfWeekPipe implements PipeTransform {
    constructor(public baseService: BaseService) { }

    transform(value: number): any {
        switch (value) {
            case 1:
                return this.baseService.translate('day-list-1');
            case 2:
                return this.baseService.translate('day-list-2');
            case 3:
                return this.baseService.translate('day-list-3');
            case 4:
                return this.baseService.translate('day-list-4');
            case 5:
                return this.baseService.translate('day-list-5');
            case 6:
                return this.baseService.translate('day-list-6');
            case 7:
                return this.baseService.translate('day-list-7');
            default:
                return this.baseService.translate('day-list-8');
        }
    }
}
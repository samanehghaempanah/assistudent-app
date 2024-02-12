import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { FilteringModel } from '../definitions/models/Common.model';

let preUrl = 'Setting';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(public baseService: BaseService) { }

  async GET(filteringModel: FilteringModel = null) {

    try {

      let result: any = await this.baseService.httpGET(preUrl, filteringModel, true);

      return result;

    } catch { }

    return null;
  }

  async Version_GET() {

    try {

      let result: any = await this.baseService.httpGET(preUrl + '/appversion', true);

      return result;

    } catch { }

    return null;
  }
}

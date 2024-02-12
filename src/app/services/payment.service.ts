import { Injectable } from '@angular/core';
import { FilteringModel } from '../definitions/models/Common.model';
import { BaseService } from './base.service';

let preUrl = 'Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(public baseService: BaseService) { }

  async GET(filteringModel: FilteringModel = null) {
    try {
      let result: any = await this.baseService.httpGET(preUrl, filteringModel, true);

      if (result) { return result; }

    } catch { }

    return null;
  }

  async POST(body: any) {
    try {
      let result: any = await this.baseService.httpPOST(preUrl, body, true);

      if (result) { return result; }
    } catch { }

    return null;
  }

  async Credit_POST(body: any) {
    try {
      let result: any = await this.baseService.httpPOST(preUrl + '/bycredit', body, true);

      if (result) { return result; }

    } catch { }

    return null;
  }

  async Credit_GET(filteringModel: FilteringModel = null) {
    try {
      let result: any = await this.baseService.httpGET(preUrl + '/usercredit', filteringModel, true);

      if (result) { return result; }

    } catch { }

    return null;
  }
}

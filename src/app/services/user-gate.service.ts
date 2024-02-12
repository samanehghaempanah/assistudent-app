import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { FilteringModel } from '../definitions/models/Common.model';

let preUrl = 'Gate';

@Injectable({
  providedIn: 'root'
})
export class UserGateService {

  constructor(public baseService: BaseService) { }

  GET(filteringModel: FilteringModel = null) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpGET(preUrl, filteringModel, true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }
}

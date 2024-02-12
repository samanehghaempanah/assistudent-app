import { Injectable } from '@angular/core';
import { FilteringModel } from '../definitions/models/Common.model';
import { BaseService } from './base.service';

let preUrl = 'Thirdparty';

@Injectable({
  providedIn: 'root'
})
export class ThirdPartyService {

  constructor(public baseService: BaseService) { }

  GET(filteringModel: FilteringModel = null) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpGET(preUrl, filteringModel, true).then(
        (result: any) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  Get(thirdPartyId: number) {
    return new Promise(async (resolve, reject) => {
      this.baseService
        .httpGET(preUrl + '/' + (thirdPartyId))
        .then(
          (result: any) => {
            resolve(result);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
}


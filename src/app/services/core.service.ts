import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { FilteringModel } from '../definitions/models/Common.model';

let preUrl = 'Core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(public baseService: BaseService) { }

  Gender_GET(filteringModel: FilteringModel = null) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpGET(preUrl + '/Gender', filteringModel, true).then(
        (result: any) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  Language_GET(filteringModel: FilteringModel = null) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpGET(preUrl + '/Language', filteringModel, true).then(
        (result: any) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  Zone_GET(filteringModel: FilteringModel = null) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpGET(preUrl + '/Zone', filteringModel, true).then(
        (result: any) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  Zone_Get(Id: number) {
    return new Promise(async (resolve, reject) => {
      this.baseService
        .httpGET(preUrl + '/Zone/' + Id)
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

  TimeSplit_GET() {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpGET(preUrl + '/TimeSplit').then(
        (result: any) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  async Major_GET(filteringModel: FilteringModel = null) {
    try {

      let result: any = await this.baseService.httpGET(preUrl + '/Major', filteringModel);

      return result;

    } catch { }

    return null;
  }

}

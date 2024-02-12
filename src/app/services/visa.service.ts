import { Injectable } from '@angular/core';
import { FilteringModel } from '../definitions/models/Common.model';
import { BaseService } from './base.service';

let preUrl = 'Visa';

@Injectable({
  providedIn: 'root',
})
export class VisaService {
  constructor(public baseService: BaseService) {}

  Categories = [
    {
      title: this.baseService.translate('visa-tab-newRequest'),
      value: 'new',
      actionUrl: '',
    },
    {
      title: this.baseService.translate('visa-tab-history'),
      value: 'history',
      actionUrl: '',
    },
  ];

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

  Get(formId: number, userformId: number = 0) {
    return new Promise(async (resolve, reject) => {
      this.baseService
        .httpGET(preUrl + '/' + (formId ?? 0) + '/' + (userformId ?? 0), null ,true)
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

  History(filteringModel: FilteringModel = null) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpGET(preUrl + '/history', filteringModel, true).then(
        (result: any) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  Draft(body: any) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpPOST(preUrl + '/draft', body, true).then(
        (result: any) => {
          resolve(result);
          console.log('draft service run');
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  Submit(body: any) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpPOST(preUrl + '/submit', body, true).then(
        (result: any) => {
          resolve(result);
          console.log('Submit service run');
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}

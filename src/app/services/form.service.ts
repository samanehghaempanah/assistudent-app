import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { FilteringModel } from '../definitions/models/Common.model';

let preUrl = 'Form';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(public baseService: BaseService) { }

  Categories = [
    {
      title: this.baseService.translate('form-tab-newRequest'),
      value: 'list',
      actionUrl: '',
    },
    {
      title: this.baseService.translate('form-tab-history'),
      value: 'history',
      actionUrl: '',
    },
  ];

  GET(filteringModel: FilteringModel = null) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpGET(preUrl, filteringModel, true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }

  Get(formId: number, userformId: number = 0) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpGET(preUrl + '/' + (formId ?? 0) + '/' + (userformId ?? 0), null, true).then(
        (result: any) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  Form_Get(userformId: number = 0) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpGET(preUrl +  '/userform/' + (userformId ?? 0), null, true).then(
        (result: any) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  UserForm(filteringModel: FilteringModel = null) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpGET(preUrl + '/userform', filteringModel, false).then((result: any) => {
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
      this.baseService.httpGET(preUrl + '/history', filteringModel, false).then((result: any) => {
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
      this.baseService.httpPOST(preUrl + '/draft', body, true).then((result: any) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  Submit(body: any) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpPOST(preUrl + '/submit', body, true).then((result: any) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}

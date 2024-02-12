import { Injectable } from '@angular/core';
import { FilteringModel } from '../definitions/models/Common.model';
import { BaseService } from './base.service';


let preUrl = 'Offer';

@Injectable({
  providedIn: 'root'
})

export class OfferService {

  constructor(public baseService: BaseService) { }

  Categories = [
    {
      title: this.baseService.translate('offer-segment-title1'),
      value: 'list',
      actionUrl: '',
    },
    {
      title: this.baseService.translate('offer-segment-title2'),
      value: 'company',
      actionUrl: '',
    },
    {
      title: this.baseService.translate('offer-segment-title3'),
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

  Get(OfferId: number) {
    return new Promise(async (resolve, reject) => {
      this.baseService
        .httpGET(preUrl + '/' + (OfferId))
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
}

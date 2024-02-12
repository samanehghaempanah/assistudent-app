import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { FilteringModel } from '../definitions/models/Common.model';

let preUrl = 'Station';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor(public baseService: BaseService) { }

  GET(filteringModel: FilteringModel = null) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpGET(preUrl, filteringModel, true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }

  POST(body: any) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpPOST(preUrl + '/userstation', body, true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }

  Get() {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpGET(preUrl + '/userstation', true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }

  PUT(stationid: number, body: any) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpPUT(preUrl + '/userstation/' + stationid, body, true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }

  DELETE(stationid: number) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpDELETE(preUrl + '/userstation/' + stationid, true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }

  Usegps_POST(body: any) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpPOST(preUrl + '/usegps', body, true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }
}

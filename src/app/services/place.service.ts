import { Injectable } from '@angular/core';
import { FilteringModel } from '../definitions/models/Common.model';
import { BaseService } from './base.service';

let preUrl = 'Place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(public baseService: BaseService) { }

  GET(filteringModel: FilteringModel = null) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpGET(preUrl, filteringModel, true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }

  PlaceType_GET(filteringModel: FilteringModel = null) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpGET(preUrl + '/placetype' , filteringModel).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }
}

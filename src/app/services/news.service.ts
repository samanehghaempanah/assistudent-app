import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { FilteringModel } from '../definitions/models/Common.model';

let preUrl = 'News';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(public baseService: BaseService) { }

  GET(filteringModel: FilteringModel = null) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpGET(preUrl, filteringModel).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }
}

import { Injectable } from '@angular/core';
import {FilteringModel} from '../definitions/models/Common.model';
import { BaseService } from './base.service';

let preUrl = 'Notification';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(public baseService: BaseService) { }

  GET(filteringModel: FilteringModel = null) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpGET(preUrl, filteringModel).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }

  Get(id : number) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpGET(preUrl + '/' + id , true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }

  Unread_GET() {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpGET(preUrl + '/unreadcount', true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }

  View_POST(Id : number) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpPOST(preUrl + '/view/' + Id , true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }

  Save_GET(tipId : number) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpGET(preUrl + '/save/' + tipId , true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }

  Save_POST(tipId : number) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpPOST(preUrl + '/save/' + tipId , true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }

  UnSave_POST(reactionId : number) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpPOST(preUrl + '/unsave/' + reactionId , true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }

  Like_GET(tipId : number) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpGET(preUrl + '/like/' + tipId , true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }

  Like_POST(tipId : number) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpPOST(preUrl + '/like/' + tipId , true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }

  UnLike_POST(reactionId : number) {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpPOST(preUrl + '/unlike/' + reactionId , true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }

  Category_GET() {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpGET(preUrl + '/category').then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }

  Ads_Get() {
    return new Promise(async (resolve, reject) => {
      this.baseService.httpGET('Ads').then((result:any)=> { resolve(result); }, (err)=> { reject(err) })
    })
  }
}

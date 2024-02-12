import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { FilteringModel } from '../definitions/models/Common.model';

let preUrl = 'Booklet';

@Injectable({
  providedIn: 'root'
})
export class BookletService {

  constructor(public baseService: BaseService) { }

  MyBookletCategories: any[] = [
    {
      title: this.baseService.translate('Booklet-myBooklet-list-tabs-uploaded'),
      value: 'uploaded',
      actionUrl: '',
    },
    {
      title: this.baseService.translate('Booklet-myBooklet-list-tabs-bought'),
      value: 'bought',
      actionUrl: '',
    }
  ];

  async GET(filteringModel: FilteringModel = null) {

    try {

      let result: any = await this.baseService.httpGET(preUrl, filteringModel, true);

      return result;

    } catch { }

    return null;
  }

  async UserBooklet_Loadfile(bookletId: number) {
    try {

      let result: any = await this.baseService.httpGET(preUrl + '/UserBooklet/loadfile/' + bookletId, true);

      return result;

    } catch { }

    return null;
  }

  async POST(body: any) {
    try {
      let result: any = await this.baseService.httpPOST(preUrl, body, true);

      return result

    } catch { }

    return null;

  }

  async Get(BookletId: number) {
    try {

      let result: any = await this.baseService.httpGET(preUrl + '/' + BookletId, null, true);

      return result;

    } catch { }

    return null;
  }

  async PUT(BookletId: number, body: any) {
    try {

      let result: any = await this.baseService.httpPUT(preUrl + '/' + BookletId, body, true);

      return result;

    } catch { }

    return null;
  }

  async DELETE(BookletId: number) {
    try {

      let result: any = await this.baseService.httpDELETE(preUrl + '/' + BookletId, true);

      return result;

    } catch { }

    return null;
  }

  async UserBooklet_GET(filteringModel: FilteringModel = null) {

    try {

      let result: any = await this.baseService.httpGET(preUrl + '/UserBooklet', filteringModel, true);

      return result;

    } catch { }

    return null;
  }

  async UserBooklet_Get(Id: number) {
    try {

      let result: any = await this.baseService.httpGET(preUrl + '/UserBooklet/' + Id, true ,true);

      return result;

    } catch { }

    return null;
  }

  async Mine_GET(filteringModel: FilteringModel = null) {

    try {

      let result: any = await this.baseService.httpGET(preUrl + '/mine', filteringModel, true);

      return result;

    } catch { }

    return null;
  }

  async Sold_Get(BookletId: number) {
    try {

      let result: any = await this.baseService.httpGET(preUrl + '/sold/' + BookletId, null, true);

      return result;

    } catch { }

    return null;
  }

  async BuyBooklet_POST(bookletId: number) {
    try {
      
      let result: any = await this.baseService.httpPOST(preUrl + '/buyfromscore/' + bookletId, true);

      return result

    } catch { }

    return null;
  }

}

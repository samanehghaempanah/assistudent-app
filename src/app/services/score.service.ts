import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { FilteringModel } from '../definitions/models/Common.model';

let preUrl = 'Action';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(public baseService: BaseService) { }

  Categories = [
    {
      title: this.baseService.translate('visa-list-History'),
      value: 'history',
      actionUrl: '',
    },
    // {
    //   title: this.baseService.translate('score-tab-promotion'),
    //   value: 'promotion',
    //   actionUrl: '',
    // },
    {
      title: this.baseService.translate('score-tab-get'),
      value: 'get',
      actionUrl: ''
    },
    {
      title: this.baseService.translate('score-tab-use'),
      value: 'use',
      actionUrl: ''
    },
    {
      title: this.baseService.translate('score-tab-common'),
      value: 'faq',
      actionUrl: ''
    },
  ];

  async GET(filteringmodel: FilteringModel = null) {

    try {

      let result: any = await this.baseService.httpGET(preUrl, filteringmodel, true);

      if (result) { return result; }

      return null;

    } catch { }
  }

  async Get(Id: number) {

    try {

      let result: any = await this.baseService.httpGET(preUrl + '/' + Id);

      if (result) { return result; }

      return null;

    } catch { }
  }

  async UserAction_GET(filteringmodel: FilteringModel = null) {

    try {

      let result: any = await this.baseService.httpGET(preUrl + '/useraction', filteringmodel, true);

      if (result) { return result; }

      return null;

    } catch { }
  }

  async UserAction_Get(Id: number) {

    try {

      let result: any = await this.baseService.httpGET(preUrl + '/useraction/', Id);

      if (result) { return result; }

      return null;

    } catch { }
  }




  History_GET() {
    return new Promise(async (resolve, reject) => {
      // this.baseService.httpGET(preUrl + '/history', true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
      resolve({
        Items:
          [
            {
              Title: this.baseService.translate("score-page3-text-savand"),
              Date: '2022/10/10',
              Score: '120+'
            },
            {
              Title: this.baseService.translate("score-page1-discount"),
              Date: '2022/06/10',
              Score: '120-'
            },
            {
              Title: this.baseService.translate("score-page3-upload"),
              Date: '2022/10/02',
              Score: '100+'
            },
            {
              Title: this.baseService.translate("score-page3-confirm"),
              Date: '2022/10/10',
              Score: '100+'
            },
          ]
      });
    });
  }

  Promotion_GET() {
    return new Promise(async (resolve, reject) => {
      // this.baseService.httpGET(preUrl + '/history', true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
      resolve({
        Items:
          [
            {
              Image: 'assets/icon/ketabteh.png',
              Title: this.baseService.translate("score-page2-tuition"),
              Description: this.baseService.translate("score-page2-term"),
              Score: 100,
              Status: this.baseService.translate("facility-list-ACTIVE")
            },
            {
              Image: 'assets/icon/uni.png',
              Title: this.baseService.translate("score-page2-tuition"),
              Description: this.baseService.translate("score-page2-buy"),
              Score: 120,
              Status: this.baseService.translate("facility-list-ACTIVE")
            }
          ]
      });
    });
  }

  Guide_GET() {
    return new Promise(async (resolve, reject) => {
      // this.baseService.httpGET(preUrl + '/history', true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
      resolve({
        Items:
          [
            {
              Label: this.baseService.translate("score-page3-btn-offer"),
              Title: this.baseService.translate("score-page3-read-book"),
              Description: this.baseService.translate("score-page3-detail"),
              Score: 120,
              Status: this.baseService.translate("score-page3-text-expire"),
              Date: ''
            },
            {
              Label: '',
              Title: this.baseService.translate("score-page3-text-savand"),
              Description: this.baseService.translate("score-page3-register-savand"),
              Score: 140,
              Status: this.baseService.translate("score-page3-btn-unlimit"),
              Date: ''
            }
          ]
      });
    });
  }

  Question_GET() {
    return new Promise(async (resolve, reject) => {
      // this.baseService.httpGET(preUrl + '/history', true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
      resolve({
        Items:
          [
            {
              Question: this.baseService.translate('score-help-question-1'),
              Answer: this.baseService.translate('score-help-answer-1')
            },
            {
              Question: this.baseService.translate('score-help-question-2'),
              Answer: this.baseService.translate('score-help-answer-2')
            },
            {
              Question: this.baseService.translate('score-help-question-3'),
              Answer: this.baseService.translate('score-help-answer-3')
            },
            {
              Question: this.baseService.translate('score-help-question-4'),
              Answer: this.baseService.translate('score-help-answer-4')
            },
          ]
      });
    });
  }
}

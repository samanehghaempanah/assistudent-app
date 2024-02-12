import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

let preUrl = 'Wallet';

@Injectable({
  providedIn: 'root'
})
export class WalletService {


  constructor(public baseService: BaseService) { }

  Categories = [
    // {
    //   title: this.baseService.translate('wallet-tab-common'),
    //   value: 'faq',
    //   actionUrl: ''
    // },
    {
      title: this.baseService.translate('wallet-tab-history'),
      value: 'history',
      actionUrl: '',
    },
    {
      title: this.baseService.translate('wallet-tab-get'),
      value: 'receive',
      actionUrl: ''
    },
    // {
    //   title: this.baseService.translate('wallet-tab-promotion'),
    //   value: 'promotion',
    //   actionUrl: '',
    // },

  ];

  async POST(body: any) {
    try {
      const result: any = await this.baseService.httpPOST('Payment', body, true);

      return result
    } catch { }
  }



  History_GET() {
    return new Promise(async (resolve, reject) => {
      // this.baseService.httpGET(preUrl + '/history', true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
      resolve({
        Items:
          [
            {
              Title: this.baseService.translate("wallet-history-text-savand"),
              Date: '2022/10/10',
              Count: '10000+'
            }
          ]
      });
    });
  }

  // Promotion_GET() {
  //   return new Promise(async (resolve, reject) => {
  //     // this.baseService.httpGET(preUrl + '/promotion', true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
  //     resolve({
  //       items:
  //         [
  //           {
  //             image: 'assets/icon/ketabteh.png',
  //             title: this.baseService.translate("score-page2-tuition"),
  //             description: this.baseService.translate("score-page2-term"),
  //             score: 100,
  //             status: this.baseService.translate("facility-list-ACTIVE")
  //           },
  //           {
  //             image: 'assets/icon/uni.png',
  //             title: this.baseService.translate("score-page2-tuition"),
  //             description: this.baseService.translate("score-page2-buy"),
  //             score: 120,
  //             status: this.baseService.translate("facility-list-ACTIVE")
  //           }
  //         ]
  //     });
  //   });
  // }

  Receive_GET() {
    return new Promise(async (resolve, reject) => {
      // this.baseService.httpGET(preUrl + '/receive', true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
      resolve({
        Items:
          [
            {
              Title: this.baseService.translate("wallet-recive-Title"),
              // Description: this.baseService.translate("wallet-recive-Description"),
              Description: this.baseService.translate("wallet-recive-Description2"),
              Text: this.baseService.translate("wallet-recive-Text"),
            }
          ]
      });
    });
  }

  Question_GET() {
    return new Promise(async (resolve, reject) => {
      // this.baseService.httpGET(preUrl + '/receive', true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
      resolve({
        Items:
          [
            {
              Question: this.baseService.translate('wallet-help-question-1'),
              Answer: this.baseService.translate('wallet-help-answer-1')
            }
          ]
      });
    });
  }
}

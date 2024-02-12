import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

let preUrl = 'Card';

@Injectable({
  providedIn: 'root'
})
export class StudentCardService {

  constructor(public baseService: BaseService) { }

  tabs = [
    {
      title: this.baseService.translate('studentCard-tab-new'),
      value: 'new',
      actionUrl: '',
    },
    {
      title: this.baseService.translate('studentCard-tab-history'),
      value: 'history',
      actionUrl: '',
    },
  ];

  async POST(body: any) {
    try {
      let result: any = await this.baseService.httpPOST(preUrl, body, true);

      return result
    } catch { }
  }

  async Get(studentno: number) {
    try {
      let result: any = await this.baseService.httpGET(preUrl + '/' + studentno, null, true);

      return result
    } catch { }
  }

  async Payments_GET(studentno: number) {
    try {
      let result: any = await this.baseService.httpGET(preUrl + '/Payments/' + studentno, null, true);

      return result
    } catch { }
  }

  async Type_GET() {
    try {
      let result: any = await this.baseService.httpGET(preUrl + '/Type' , null, true);

      return result
    } catch { }
  }


  cardHistoryList() {
    return new Promise(async (resolve, reject) => {
      (
        resolve({
          Items: [
            {
              id: '1',
              cardNumber: '1234567',
              date: '1401/01/01',
              status: 'delivered',
              statusText: this.baseService.translate("studentCard-history-status-delivered")
            },
            {
              id: '2',
              cardNumber: '1234567',
              date: '1401/02/23',
              status: 'ready to deliver',
              statusText: this.baseService.translate("studentCard-history-status-ready")
            }
          ]
        })
      )
    });

  }



}

import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class FacilitiesService {

  constructor(
    public baseService: BaseService
  ) { }



  Tags = [
    {
      name: this.baseService.translate('facility-tag-refrigerator'),
      colSize: '4',
      img: '/assets/icon/figmaIcon/fridge.svg'
    },
    {
      name: this.baseService.translate('facility-tag-microwave'),
      colSize: '4',
      img: '/assets/icon/figmaIcon/microwave.svg'
    },
    {
      name: this.baseService.translate('facility-tag-wifi'),
      colSize: '4',
      img: '/assets/icon/figmaIcon/wifi.svg'
    },
    {
      name: this.baseService.translate('facility-tag-parking'),
      colSize: '4',
      img: '/assets/icon/figmaIcon/parking.svg'
    },
    {
      name: this.baseService.translate('facility-tag-green-space'),
      colSize: '6',
      img: '/assets/icon/figmaIcon/courtyard.svg'
    },
    {
      name: this.baseService.translate('facility-tag-gym'),
      colSize: '7',
      img: '/assets/icon/figmaIcon/gym.svg'
    },
  ]

  Categories = [
    {
      title: this.baseService.translate('facility-list-NewFacilities'),
      value: 'list',
      actionUrl: '',
    },
    // {
    //   title: this.baseService.translate('facility-list-MyFacilities'),
    //   value: 'MyFacilities',
    //   actionUrl: '',
    // },
    {
      title: this.baseService.translate('facility-list-History'),
      value: 'History',
      actionUrl: '',
    }
  ];

  NewCategories = [
    {
      value: 'all',
      title: this.baseService.translate('facility-new-category-all'),
      actionUrl: '',
    },
    {
      value: 'recreational',
      title: this.baseService.translate('facility-new-category-recreational'),
      actionUrl: '',
    },
    {
      value: 'sports',
      title: this.baseService.translate('facility-new-category-sports'),
      actionUrl: '',
    },
    {
      value: 'educational',
      title: this.baseService.translate('facility-new-category-educational'),
      actionUrl: '',
    },
  ]

  FacilityViewImages = [
    {
      Title: 'gym',
      Link : '#',
      MainFile: '../../assets/icon/pool.png'
    },
    {
      Title: 'gym',
      Link : '#',
      MainFile: '../../assets/icon/pool.png'
    },
    {
      Title: 'gym',
      Link : '#',
      MainFile: '../../assets/icon/pool.png'
    },
    {
      Title: 'gym',
      Link : '#',
      MainFile: '../../assets/icon/pool.png'
    },
    {
      Title: 'gym',
      Link : '#',
      MainFile: '../../assets/icon/pool.png'
    },
    {
      Title: 'gym',
      Link : '#',
      MainFile: '../../assets/icon/pool.png'
    },
  ]
  

  FacilityViewPackage = [
    {
      title: this.baseService.translate('facility-mock-package-1')
    },
    {
      title: this.baseService.translate('facility-mock-package-2')
    },
    {
      title: this.baseService.translate('facility-mock-package-3')
    },
  ]

  FacilitysList() {
    return new Promise(async (resolve, reject) => {
      (resolve({
        Items : [
          {
            id:1,
            img: '../../assets/icon/pool.png',
            price: this.baseService.translate('facility-list-fipaid'),
            category: this.baseService.translate('facility-list-Sport'),
            title: this.baseService.translate('facility-list-BodyBilding'),
            desc: this.baseService.translate('facility-list-desc'),
          },
          {
            id:2,
            img: '../../assets/icon/pool.png',
            price: this.baseService.translate('facility-list-fipaid'),
            category: this.baseService.translate('facility-list-Sport'),
            title: this.baseService.translate('facility-list-BodyBilding'),
            desc: this.baseService.translate('facility-list-desc'),
          },
          {
            id:3,
            img: '../../assets/icon/pool.png',
            price: this.baseService.translate('facility-list-fipaid'),
            category: this.baseService.translate('facility-list-Sport'),
            title: this.baseService.translate('facility-list-BodyBilding'),
            desc: this.baseService.translate('facility-list-desc'),
          }
        ]
      }))
    });
  }

  UserFacilitysList() {
    return new Promise(async (resolve, reject) => {
      // query.Code = 'UserFacility';
      // this.baseService.httpQuery(query).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }

  FacilitysListFiltered( id: string) {
    return new Promise(async (resolve, reject) => {
      // query.Code = 'Facilitys';
      // query.Filters = [{ "FieldName": "id", "Value": id, "Operator": "equal" }]
      // this.baseService.httpQuery(query).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }

  BuyFacilitys(Facilityid: number, expireDate: string, price: number) {
    return new Promise(async (resolve, reject) => {
      let body = {
        "FacilityId": Facilityid,
        "ExpireDate": expireDate,
        "Price": price
      };
      // this.baseService.httpPost('User/AddUserFacility', body, true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }

  RateFacilitys(Facilityid: number, rate: number) {
    return new Promise(async (resolve, reject) => {
      // this.baseService.httpPost('User/AddUserFacilityRate', body, true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }

  FacilitiesHistoryList(){
    return new Promise(async (resolve, reject) => {
      (
        resolve({
          Items : [
            {
              id: '1',
              img: '../../assets/icon/pool.png',
              title: this.baseService.translate('facility-list-Dormitory'),
              categoryTitle: this.baseService.translate('facility-list-Accomodation'),
              status: this.baseService.translate('facility-list-ACTIVE'),
              price: this.baseService.translate('facility-list-fipaid'),
              userExpireDate: this.baseService.translate('facility-list-date')
            },
            {
              id: '2',
              img: '../../assets/icon/pool.png',
              title: this.baseService.translate('facility-list-Football'),
              categoryTitle: this.baseService.translate('facility-list-Sport'),
              status: this.baseService.translate('facility-list-Expire'),
              price: this.baseService.translate('facility-list-fipaid'),
              userExpireDate: this.baseService.translate('facility-list-date')
            },
            {
              id: '3',
              img: '../../assets/icon/pool.png',
              title: this.baseService.translate('facility-list-BodyBilding'),
              categoryTitle: this.baseService.translate('facility-list-Sport'),
              status: this.baseService.translate('facility-list-Draft'),
              price: this.baseService.translate('facility-list-fipaid'),
              userExpireDate: this.baseService.translate('facility-list-date')
            },
          ]
        })
      )
    });
    
  }

  
}

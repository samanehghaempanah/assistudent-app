import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(public baseService: BaseService) { }

  // options: Array<ListMenuOptionModel> = [
  //   {
  //     Icon: "/assets/icon/listmenu/ketabyar.svg",
  //     URL: "",
  //     MenuType: "InnerLink",
  //     Title: this.baseService.translate('home-menu-bookfriend'),
  //     Disable: true
  //   },
  //   {
  //     Icon: "/assets/icon/listmenu/karyar.svg",
  //     URL: "home/offer",
  //     MenuType: "InnerLink",
  //     Title: this.baseService.translate('home-menu-workbuddy'),
  //     Disable: false
  //   },
  //   {
  //     Icon: "/assets/icon/listmenu/pazhohesh.svg",
  //     URL: "https://ris.iau.ir/",
  //     MenuType: "OuterLink",
  //     Title: this.baseService.translate('home-menu-researchassistant'),
  //     Disable: false
  //   },
  //   {
  //     Icon: "/assets/icon/listmenu/amoozesh.svg",
  //     URL: "https://edu.iau.ac.ir/",
  //     MenuType: "OuterLink",
  //     Title: this.baseService.translate('home-menu-Amoozeshyar'),
  //     Disable: false
  //   },
  //   {
  //     Icon: "/assets/icon/listmenu/reghabat.svg",
  //     URL: "",
  //     MenuType: "InnerLink",
  //     Title: this.baseService.translate('home-menu-competitionfriend'),
  //     Disable: true
  //   },
  //   {
  //     Icon: "/assets/icon/listmenu/online.svg",
  //     URL: "https://fstudent.iau.ir/",
  //     MenuType: "OuterLink",
  //     Title: this.baseService.translate('home-menu-FStudent'),
  //     Disable: false
  //   },
  //   {
  //     Icon: "/assets/icon/listmenu/class.svg",
  //     URL: "classroom/program",
  //     MenuType: "InnerLink",
  //     Title: this.baseService.translate('home-menu-classmate'),
  //     Disable: false
  //   },
  //   {
  //     Icon: "/assets/icon/listmenu/jozve.svg",
  //     URL: "",
  //     MenuType: "InnerLink",
  //     Title: this.baseService.translate('home-menu-handout'),
  //     Disable: true
  //   },
  //   {
  //     Icon: "/assets/icon/listmenu/maharat.svg",
  //     URL: "https://scl.iaun.ac.ir/",
  //     MenuType: "OuterLink",
  //     Title: this.baseService.translate('home-menu-skillmate'),
  //     Disable: false
  //   },
  //   {
  //     Icon: "/assets/icon/listmenu/refahi.svg",
  //     URL: "home/facility/list",
  //     MenuType: "InnerLink",
  //     Title: this.baseService.translate('home-menu-Facilities'),
  //     Disable: false
  //   },
  //   {
  //     Icon: "/assets/icon/listmenu/location.svg",
  //     URL: "home/places",
  //     MenuType: "InnerLink",
  //     Title: this.baseService.translate('home-menu-Locations'),
  //     Disable: false
  //   },
  //   {
  //     Icon: "/assets/icon/listmenu/masir.svg",
  //     URL: "home/track",
  //     MenuType: "InnerLink",
  //     Title: this.baseService.translate('home-menu-gps'),
  //     Disable: false
  //   },
  //   {
  //     Icon: "/assets/icon/listmenu/taxi.svg",
  //     URL: "",
  //     MenuType: "InnerLink",
  //     Title: this.baseService.translate('home-menu-taxifinder'),
  //     Disable: true
  //   },
  //   {
  //     Icon: "/assets/icon/listmenu/visa.svg",
  //     URL: "home/visa/new",
  //     MenuType: "InnerLink",
  //     Title: this.baseService.translate('home-menu-Visa'),
  //     Disable: false
  //   },
  //   {
  //     Icon: "/assets/icon/listmenu/sima.svg",
  //     URL: "http://sima.iaun.ac.ir/login/index.php/",
  //     MenuType: "OuterLink",
  //     Title: this.baseService.translate('home-menu-LMS'),
  //     Disable: false
  //   },
  //   {
  //     Icon: "/assets/icon/listmenu/ghiab.svg",
  //     URL: "",
  //     MenuType: "InnerLink",
  //     Title: this.baseService.translate('home-menu-presence-absence'),
  //     Disable: true
  //   }
  // ]

  VersionChangeData() {
    return new Promise(async (resolve, reject) => {
      // query.Code = '?????';
      // this.baseService.httpQuery(query, false).then((result: any) => { resolve(result); }, (err) => { reject(err); });
      resolve({
        items:
          [
            {
              id: 0,
              title: this.baseService.translate('version-list-title4')
            },
            {
              id: 1,
              title: this.baseService.translate('version-list-title3')
            },
            {
              id: 2,
              title: this.baseService.translate('version-list-title2')
            },
            {
              id: 4,
              title: this.baseService.translate('version-list-title1')
            }
          ]
      });
    });
  }
}

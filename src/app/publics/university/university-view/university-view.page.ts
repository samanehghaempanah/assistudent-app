import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ScrollableTabModel } from 'src/app/definitions/models/Common.model';
import { RoleCode } from 'src/app/definitions/models/DataTypes.model';
import { MajorDataModel } from 'src/app/definitions/models/Entities.model';
import { BaseService } from 'src/app/services/base.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-university',
  templateUrl: './university-view.page.html',
  styleUrls: ['./university-view.page.scss'],
})
export class UniversityViewPage implements OnInit {

  Categories: ScrollableTabModel[] = [];
  selectedTab: any = null;
  PageData = {
    Waiting: false,
    pageId: '',
    title: '',
    IFrameURL: '',
    isNonIranian: false,
    isRole: 0,
    Symbol: ''
  };

  majorsInfo: MajorDataModel[] = [
    {
      Id: 1,
      Title: this.baseService.translate("university-view-tuition-humanities"),
      Tuition_Data: [
        {
          Id: 1,
          Degree: this.baseService.translate("university-view-tuition-bachelor"),
          Tuition: 400,
        },
        {
          Id: 2,
          Degree: this.baseService.translate("university-view-tuition-master"),
          Tuition: 900,
        },
        {
          Id: 3,
          Degree: this.baseService.translate("university-view-tuition-phd"),
          Tuition: 1500,
        }]
    },
    {
      Id: 2,
      Title: this.baseService.translate("university-view-tuition-art"),
      Tuition_Data: [
        {
          Id: 1,
          Degree: this.baseService.translate("university-view-tuition-bachelor"),
          Tuition: 450,
        },
        {
          Id: 2,
          Degree: this.baseService.translate("university-view-tuition-master"),
          Tuition: 950,
        },
        {
          Id: 3,
          Degree: this.baseService.translate("university-view-tuition-phd"),
          Tuition: 1800,
        }]
    },
    {
      Id: 3,
      Title: this.baseService.translate("university-view-tuition-technical"),
      Tuition_Data: [
        {
          Id: 1,
          Degree: this.baseService.translate("university-view-tuition-bachelor"),
          Tuition: 500,
        },
        {
          Id: 2,
          Degree: this.baseService.translate("university-view-tuition-master"),
          Tuition: 1000,
        },
        {
          Id: 3,
          Degree: this.baseService.translate("university-view-tuition-phd"),
          Tuition: 2000,
        }]
    },
    {
      Id: 4,
      Title: this.baseService.translate("university-view-tuition-medical"),
      Tuition_Data: [
        {
          Id: 1,
          Degree: this.baseService.translate("university-view-tuition-bachelor"),
          Tuition: 1000,
        },
        {
          Id: 2,
          Degree: this.baseService.translate("university-view-tuition-master"),
          Tuition: 1200,
        },
        {
          Id: 3,
          Degree: this.baseService.translate("university-view-tuition-professional"),
          Tuition: 4500,
        }]
    }
  ];

  // Majors Image for Non Iranian
  majorsArImage: any[] = [
    {
      src: 'https://mydownload.iaun.ac.ir/image/formandfiles/Major/ar/pic1.jpg',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/formandfiles/Major/ar/pic2.jpg',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/formandfiles/Major/ar/pic3.jpg',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/formandfiles/Major/ar/pic4.jpg',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/formandfiles/Major/ar/pic5.jpg',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/formandfiles/Major/ar/pic6.jpg',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/formandfiles/Major/ar/pic7.jpg',
      alt: 'My University '
    }
  ];
  majorsEnImage: any[] = [
    {
      src: 'https://mydownload.iaun.ac.ir/image/formandfiles/Major/en/pic1.jpg',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/formandfiles/Major/en/pic2.jpg',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/formandfiles/Major/en/pic3.jpg',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/formandfiles/Major/en/pic4.jpg',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/formandfiles/Major/en/pic5.jpg',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/formandfiles/Major/en/pic6.jpg',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/formandfiles/Major/en/pic7.jpg',
      alt: 'My University '
    }
  ];
  majorsFaImage: any[] = [
    {
      src: 'https://mydownload.iaun.ac.ir/image/formandfiles/Major/fa/pic1.jpg',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/formandfiles/Major/fa/pic3.jpg',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/formandfiles/Major/fa/pic4.jpg',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/formandfiles/Major/fa/pic5.jpg',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/formandfiles/Major/fa/pic6.jpg',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/formandfiles/Major/fa/pic7.jpg',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/formandfiles/Major/fa/pic8.jpg',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/formandfiles/Major/fa/pic9.jpg',
      alt: 'My University '
    }
  ];

  // Uni booklet for Non Iranian
  bookletAr: any = {
    src: 'https://mydownload.iaun.ac.ir/image/formandfiles/Catalog/arabic.pdf',
    alt: 'My University '
  };
  bookletEn: any = {
    src: 'https://mydownload.iaun.ac.ir/image/formandfiles/Catalog/english.pdf',
    alt: 'My University '
  };
  bookletFa: any = {
    src: 'https://mydownload.iaun.ac.ir/image/formandfiles/Catalog/Farsi.pdf',
    alt: 'My University '
  };


  constructor(public baseService: BaseService, public route: ActivatedRoute, public navCtrl: NavController, public storageService: StorageService) { }

  ngOnInit() {
    this.PageData.Symbol = this.storageService.Language.Symbol;
    if (this.route.snapshot.paramMap.get('id') != null) {
      this.PageData.pageId = this.route.snapshot.paramMap.get('id');
    }
  }

  ionViewWillEnter() {
    if (this.baseService.authenticated) {
      this.storageService.User.Roles.forEach((el: any) => {
        if (el.Role_Code === RoleCode.StudentEnglish || el.Role_Code === RoleCode.StudentArabic || el.Role_Code === RoleCode.StudentAfghan) {
          this.PageData.isNonIranian = true;
          this.PageData.isRole = el.Role_Code;
        }
      });
    } else if (!this.baseService.authenticated && this.storageService.Language.Symbol === 'ar' || this.storageService.Language.Symbol === 'en') {
      this.PageData.isNonIranian = true;
    }

    switch (this.PageData.pageId) {
      case '1':
        this.Categories = [
          {
            title: this.baseService.translate("university-view-introduction"),
            value: 'introduction',
            actionUrl: '',
          },
          {
            title: this.baseService.translate("university-view-booklet"),
            value: 'booklet',
            actionUrl: {
              fa: 'https://iaun.iau.ir/images/1400/iaun-v9.pdf',
              en: 'https://iaun.iau.ir/images/1400/iaun-v9.pdf',
              ar: 'https://iaun.iau.ir/images/1400/iaun-v9.pdf',
            },
          },
          {
            title: this.baseService.translate("university-view-gallery"),
            value: 'gallery',
            actionUrl: {
              fa: 'https://iaun.iau.ir/gallery',
              en: 'https://iaun.iau.ir/en/gallery',
              ar: 'https://iaun.iau.ir/%D9%85%D9%86-%D9%86%D8%AD%D9%86/%DA%AF%D8%A7%D9%84%D8%B1%DB%8C-%D8%AA%D8%B5%D8%A7%D9%88%DB%8C%D8%B1-%D8%B9%D8%B1%D8%A8%DB%8C',
            }
          },
          {
            title: this.baseService.translate("university-view-honors"),
            value: 'honors',
            actionUrl: {
              fa: 'https://iaun.iau.ir/about/%D8%A7%D9%81%D8%AA%D8%AE%D8%A7%D8%B1%D8%A7%D8%AA-%D9%88-%D8%AF%D8%B3%D8%AA%D8%A7%D9%88%D8%B1%D8%AF%D9%87%D8%A7',
              en: 'https://iaun.iau.ir/about/%D8%A7%D9%81%D8%AA%D8%AE%D8%A7%D8%B1%D8%A7%D8%AA-%D9%88-%D8%AF%D8%B3%D8%AA%D8%A7%D9%88%D8%B1%D8%AF%D9%87%D8%A7',
              ar: 'https://iaun.iau.ir/%D9%85%D9%86-%D9%86%D8%AD%D9%86/%D8%A7%D9%81%D8%AA%D8%AE%D8%A7%D8%B1%D8%A7%D8%AA-%D9%88-%D8%AF%D8%B3%D8%AA%D8%A7%D9%88%D8%B1%D8%AF%D9%87%D8%A7'
            }
          },
          {
            title: this.baseService.translate("university-view-possibilities"),
            value: 'possibilities',
            actionUrl: {
              fa: 'https://iaun.iau.ir/images/1400/emkanat.pdf',
              en: 'https://iaun.iau.ir/images/1400/emkanat.pdf',
              ar: 'https://iaun.iau.ir/images/1400/emkanat.pdf',
            }
          }
        ];
        this.PageData.title = this.baseService.translate('university-list-introduction');
        this.selectedTab = 'introduction';
        break;
      case '2':
        this.Categories = [
          {
            title: this.baseService.translate("university-view-introduction-majors"),
            value: 'introduction-majors',
            actionUrl: {
              fa: 'https://iaun.iau.ir/majors-info',
              en: 'https://iaun.iau.ir/en/majors-info',
              ar: 'https://iaun.iau.ir/en/majors-info',
            }
          },
          {
            title: this.baseService.translate("university-view-majors"),
            value: 'majors',
            actionUrl: {
              fa: 'https://iaun.iau.ir/majors',
              en: 'https://iaun.iau.ir/majors',
              ar: 'https://iaun.iau.ir/majors',
            }
          },
          {
            title: this.baseService.translate("university-view-tuition"),
            value: 'tuition',
            actionUrl: {
              fa: 'https://iaun.iau.ir/edari-mali/%D8%B4%D9%87%D8%B1%DB%8C%D9%87-%D8%B1%D8%B4%D8%AA%D9%87-%D9%87%D8%A7-%D9%88-%D8%AA%D8%B3%D9%87%DB%8C%D9%84%D8%A7%D8%AA-%D8%AF%D8%A7%D9%86%D8%B4%D8%AC%D9%88%DB%8C%DB%8C',
              en: 'https://iaun.iau.ir/edari-mali/%D8%B4%D9%87%D8%B1%DB%8C%D9%87-%D8%B1%D8%B4%D8%AA%D9%87-%D9%87%D8%A7-%D9%88-%D8%AA%D8%B3%D9%87%DB%8C%D9%84%D8%A7%D8%AA-%D8%AF%D8%A7%D9%86%D8%B4%D8%AC%D9%88%DB%8C%DB%8C',
              ar: 'https://iaun.iau.ir/edari-mali/%D8%B4%D9%87%D8%B1%DB%8C%D9%87-%D8%B1%D8%B4%D8%AA%D9%87-%D9%87%D8%A7-%D9%88-%D8%AA%D8%B3%D9%87%DB%8C%D9%84%D8%A7%D8%AA-%D8%AF%D8%A7%D9%86%D8%B4%D8%AC%D9%88%DB%8C%DB%8C',
            }
          },
        ];
        this.PageData.title = this.baseService.translate('university-list-majors');
        this.selectedTab = 'introduction-majors';
        if (this.storageService.Language.Symbol === 'en') { this.PageData.IFrameURL = 'https://iaun.iau.ir/majors-info'; }

        else if (this.storageService.Language.Symbol === 'ar') { this.PageData.IFrameURL = 'https://iaun.iau.ir/majors-info'; }

        else if (this.storageService.Language.Symbol === 'fa') { this.PageData.IFrameURL = 'https://iaun.iau.ir/majors-info'; }
        this.PageData.Waiting = true;
        setTimeout(() => {
          this.PageData.Waiting = false;
        }, 2000);
        break
      case '3':
        this.Categories = null;
        this.PageData.title = this.baseService.translate('university-list-registration-guide');
        break
      case '4':
        this.Categories = null;
        this.PageData.title = this.baseService.translate('university-list-amoozeshyar-guide');
        if (this.storageService.Language.Symbol === 'en') { this.PageData.IFrameURL = 'https://iaun.iau.ir/edu-login'; }

        else if (this.storageService.Language.Symbol === 'ar') { this.PageData.IFrameURL = 'https://iaun.iau.ir/edu-login'; }

        else if (this.storageService.Language.Symbol === 'fa') { this.PageData.IFrameURL = 'https://iaun.iau.ir/edu-login'; }

        this.PageData.Waiting = true;
        setTimeout(() => {
          this.PageData.Waiting = false;
        }, 2000);
        break
      case '5':
        this.Categories = [
          {
            title: this.baseService.translate("university-view-welfare"),
            value: 'welfare',
            actionUrl: {
              fa: 'https://iaun.iau.ir/edari-mali/sandooghrefah',
              en: 'https://iaun.iau.ir/edari-mali/sandooghrefah',
              ar: 'https://iaun.iau.ir/edari-mali/sandooghrefah',
            }
          },
          {
            title: this.baseService.translate("university-view-dorm"),
            value: 'dorm',
            actionUrl: {
              fa: 'https://iaun.iau.ir/rooms',
              en: 'https://iaun.iau.ir/rooms',
              ar: 'https://iaun.iau.ir/rooms',
            }
          }
        ];
        this.PageData.title = this.baseService.translate('university-list-welfare');
        this.selectedTab = 'welfare';
        if (this.storageService.Language.Symbol === 'en') { this.PageData.IFrameURL = 'https://iaun.iau.ir/edari-mali/sandooghrefah'; }

        else if (this.storageService.Language.Symbol === 'ar') { this.PageData.IFrameURL = 'https://iaun.iau.ir/edari-mali/sandooghrefah'; }

        else if (this.storageService.Language.Symbol === 'fa') { this.PageData.IFrameURL = 'https://iaun.iau.ir/edari-mali/sandooghrefah'; }

        this.PageData.Waiting = true;
        setTimeout(() => {
          this.PageData.Waiting = false;
        }, 2000);
        break
      case '6':
        this.Categories = null;
        this.PageData.title = this.baseService.translate('university-list-verification');
        if (this.storageService.Language.Symbol === 'en') { this.PageData.IFrameURL = 'https://emt.medu.ir'; }

        else if (this.storageService.Language.Symbol === 'ar') { this.PageData.IFrameURL = 'https://emt.medu.ir'; }

        else if (this.storageService.Language.Symbol === 'fa') { this.PageData.IFrameURL = 'https://emt.medu.ir'; }

        this.PageData.Waiting = true;
        setTimeout(() => {
          this.PageData.Waiting = false;
        }, 2000);
        break
      case '7':
        this.Categories = [
          {
            title: this.baseService.translate("university-view-telephone"),
            value: 'telephone',
            actionUrl: {
              fa: 'https://iaun.iau.ir/moshavere-telefoni',
              en: 'https://iaun.iau.ir/moshavere-telefoni',
              ar: 'https://iaun.iau.ir/moshavere-telefoni',
            }
          },
          {
            title: this.baseService.translate("university-view-face"),
            value: 'face',
            actionUrl: {
              fa: 'https://iaun.iau.ir/moshavere-hozoori',
              en: 'https://iaun.iau.ir/moshavere-hozoori',
              ar: 'https://iaun.iau.ir/moshavere-hozoori',
            }
          },
          {
            title: this.baseService.translate("university-view-admission"),
            value: 'admission',
            actionUrl: {
              fa: 'https://iaun.iau.ir/%D8%B4%D9%85%D8%A7%D8%B1%D9%87-%D9%87%D8%A7%DB%8C-%D8%AA%D9%85%D8%A7%D8%B3-%D8%B3%D8%AA%D8%A7%D8%AF-%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C%DB%8C-%D9%88-%D9%BE%D8%A7%D8%B3%D8%AE%DA%AF%D9%88%DB%8C%DB%8C',
              en: 'https://iaun.iau.ir/%D8%B4%D9%85%D8%A7%D8%B1%D9%87-%D9%87%D8%A7%DB%8C-%D8%AA%D9%85%D8%A7%D8%B3-%D8%B3%D8%AA%D8%A7%D8%AF-%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C%DB%8C-%D9%88-%D9%BE%D8%A7%D8%B3%D8%AE%DA%AF%D9%88%DB%8C%DB%8C',
              ar: 'https://iaun.iau.ir/%D8%B4%D9%85%D8%A7%D8%B1%D9%87-%D9%87%D8%A7%DB%8C-%D8%AA%D9%85%D8%A7%D8%B3-%D8%B3%D8%AA%D8%A7%D8%AF-%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C%DB%8C-%D9%88-%D9%BE%D8%A7%D8%B3%D8%AE%DA%AF%D9%88%DB%8C%DB%8C',
            }
          },
          {
            title: this.baseService.translate("university-view-consultation"),
            value: 'consultation',
            actionUrl: {
              fa: 'https://iaun.iau.ir/moshaveretahsili',
              en: 'https://iaun.iau.ir/moshaveretahsili',
              ar: 'https://iaun.iau.ir/moshaveretahsili',
            }
          },
          {
            title: this.baseService.translate("university-view-guidance"),
            value: 'guidance',
            actionUrl: {
              fa: 'https://iaun.iau.ir/%D9%85%D8%B1%D8%A7%DA%A9%D8%B2-%D9%88-%D9%85%D9%88%D8%B3%D8%B3%D8%A7%D8%AA/%D9%85%D8%B1%DA%A9%D8%B2-%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C%DB%8C',
              en: 'https://iaun.iau.ir/%D9%85%D8%B1%D8%A7%DA%A9%D8%B2-%D9%88-%D9%85%D9%88%D8%B3%D8%B3%D8%A7%D8%AA/%D9%85%D8%B1%DA%A9%D8%B2-%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C%DB%8C',
              ar: 'https://iaun.iau.ir/%D9%85%D8%B1%D8%A7%DA%A9%D8%B2-%D9%88-%D9%85%D9%88%D8%B3%D8%B3%D8%A7%D8%AA/%D9%85%D8%B1%DA%A9%D8%B2-%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C%DB%8C',
            }
          }
          ,
          {
            title: this.baseService.translate("university-view-emergency"),
            value: 'emergency',
            actionUrl: {
              fa: 'https://iaun.iau.ir/tel',
              en: 'https://iaun.iau.ir/tel',
              ar: 'https://iaun.iau.ir/tel',
            }
          }
        ];
        this.PageData.title = this.baseService.translate('university-list-contact');
        this.selectedTab = 'telephone';
        if (this.storageService.Language.Symbol === 'en') { this.PageData.IFrameURL = 'https://iaun.iau.ir/moshavere-telefoni'; }

        else if (this.storageService.Language.Symbol === 'ar') { this.PageData.IFrameURL = 'https://iaun.iau.ir/moshavere-telefoni'; }

        else if (this.storageService.Language.Symbol === 'fa') { this.PageData.IFrameURL = 'https://iaun.iau.ir/moshavere-telefoni'; }
        this.PageData.Waiting = true;
        setTimeout(() => {
          this.PageData.Waiting = false;
        }, 2000);
        break
      case '8':
        this.Categories = [
          {
            title: this.baseService.translate("university-view-routes"),
            value: 'routes',
            actionUrl: {
              fa: 'https://iaun.iau.ir/access',
              en: 'https://iaun.iau.ir/access',
              ar: 'https://iaun.iau.ir/%D9%85%D9%86-%D9%86%D8%AD%D9%86/%D8%B7%D8%B1%D9%82-%D8%A7%D9%84%D9%88%D8%B5%D9%88%D9%84-%D8%A5%D9%84%D9%89-%D8%A7%D9%84%D8%AC%D8%A7%D9%85%D8%B9%D8%A9',
            }
          },
          {
            title: this.baseService.translate("university-view-station"),
            value: 'station',
            actionUrl: {
              fa: 'https://iaun.iau.ir/station-transportation',
              en: 'https://iaun.iau.ir/en/station-transportation',
              ar: 'https://iaun.iau.ir/station-transportation',
            }
          },
          {
            title: this.baseService.translate("university-view-map"),
            value: 'map',
            actionUrl: '',
          }
        ];
        this.PageData.title = this.baseService.translate('university-list-map');
        this.selectedTab = 'routes';
        if (this.storageService.Language.Symbol === 'en') { this.PageData.IFrameURL = 'https://iaun.iau.ir/access'; }

        else if (this.storageService.Language.Symbol === 'ar') { this.PageData.IFrameURL = 'https://iaun.iau.ir/access'; }

        else if (this.storageService.Language.Symbol === 'fa') { this.PageData.IFrameURL = 'https://iaun.iau.ir/access'; }
        this.PageData.Waiting = true;
        setTimeout(() => {
          this.PageData.Waiting = false;
        }, 2000);
        break
      case '9':
        this.Categories = null;
        this.PageData.title = this.baseService.translate('university-list-rules');
        break
      case '10':
        this.Categories = null;
        this.PageData.title = this.baseService.translate('university-list-coverage');
        break
    }
  }

  onTabClick(event: any) {
    this.PageData.title = event.title;
    this.selectedTab = event.value;
    if ((this.selectedTab === 'tuition' || this.selectedTab === 'majors') && this.PageData.isNonIranian) {
      event.actionUrl = '';
      this.PageData.IFrameURL = event.actionUrl;
    }
    else if (this.selectedTab === 'booklet' && this.PageData.isNonIranian) {
      if (this.storageService.Language.Symbol === 'en') {
        event.actionUrl = this.bookletEn.src;
        this.PageData.IFrameURL = event.actionUrl;
      }

      else if (this.storageService.Language.Symbol === 'ar') {
        event.actionUrl = this.bookletAr.src;
        this.PageData.IFrameURL = event.actionUrl;
      }

      else if (this.storageService.Language.Symbol === 'fa') {
        event.actionUrl = this.bookletFa.src;
        this.PageData.IFrameURL = event.actionUrl;
      }
    }
    else {
      this.PageData.Waiting = true;
      if (!event.actionUrl) { this.PageData.IFrameURL = event.actionUrl; }

      else if (this.storageService.Language.Symbol === 'en') {
        this.PageData.IFrameURL = event.actionUrl.en;
      }

      else if (this.storageService.Language.Symbol === 'ar') {
        this.PageData.IFrameURL = event.actionUrl.ar;
      }

      else if (this.storageService.Language.Symbol === 'fa') {
        this.PageData.IFrameURL = event.actionUrl.fa;
      }



      if (event) {
        setTimeout(() => {
          this.PageData.Waiting = false;
        }, 2000)
      }
    }
  }
}

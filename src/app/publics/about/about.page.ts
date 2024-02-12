import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ScrollableTabModel } from 'src/app/definitions/models/Common.model';
import { RoleCode } from 'src/app/definitions/models/DataTypes.model';
import { BaseService } from 'src/app/services/base.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  Categories: ScrollableTabModel[] = [];
  selectedTab: any = null;
  title = '';

  PageData = {
    Waiting: false,
    isNonIranian: false,
    isRole: 0,
    guidesImage: [] as any
  };

  // Guide Image for Non Iranian
  guidesArImage: any[] = [
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/ar/welcome.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/ar/login.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/ar/home.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/ar/more-option.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/ar/sidemenu.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/ar/profile.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/ar/setting.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/ar/score.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/ar/wallet.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/ar/forms.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/ar/place.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/ar/gps.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/ar/user-gate.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/ar/cartable.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/ar/offer.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/ar/student-card.PNG',
      alt: 'My University '
    }
  ];
  guidesEnImage: any[] = [
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/en/welcome.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/en/login.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/en/home.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/en/more-option.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/en/sidemenu.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/en/profile.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/en/setting.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/en/score.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/en/wallet.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/en/forms.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/en/place.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/en/gps.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/en/user-gate.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/en/cartable.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/en/offer.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/en/student-card.PNG',
      alt: 'My University '
    }
  ];
  guidesFaImage: any[] = [
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/fa/welcome.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/fa/login.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/fa/home.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/fa/more-option.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/fa/sidemenu.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/fa/profile.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/fa/setting.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/fa/score.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/fa/wallet.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/fa/forms.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/fa/place.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/fa/gps.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/fa/user-gate.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/fa/cartable.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/fa/offer.PNG',
      alt: 'My University '
    },
    {
      src: 'https://mydownload.iaun.ac.ir/image/help/fa/student-card.PNG',
      alt: 'My University '
    }
  ];

  constructor(public baseService: BaseService, public route: ActivatedRoute, public navCtrl: NavController, public storageService: StorageService) { }

  ngOnInit() {
    // Set Guide Image With Language
    if (this.storageService.Language.Symbol === 'fa') { this.PageData.guidesImage = this.guidesFaImage; }
    else if (this.storageService.Language.Symbol === 'ar') { this.PageData.guidesImage = this.guidesArImage; }
    else if (this.storageService.Language.Symbol === 'en') { this.PageData.guidesImage = this.guidesEnImage; }
  }

  ionViewDidEnter() {

    this.loadCategories();

    if (this.baseService.authenticated) {
      this.storageService.User.Roles.forEach((el: any) => {
        if (el.Role_Code === RoleCode.StudentEnglish || el.Role_Code === RoleCode.StudentArabic || el.Role_Code === RoleCode.StudentAfghan) {
          this.PageData.isNonIranian = true;
          this.PageData.isRole = el.Role_Code;
        }
      });
    }
    else if (!this.baseService.authenticated && this.storageService.Language.Symbol === 'ar' || this.storageService.Language.Symbol === 'en') {
      this.PageData.isNonIranian = true;
    }

    if (this.route.snapshot.paramMap.get('selectedTab') != null) {
      this.selectedTab = this.route.snapshot.paramMap.get('selectedTab');
    }

    if (this.selectedTab === 'ChangesApp') {
      this.title = this.baseService.translate('menu-list-item-ChangesApp');
    }
    else if (this.selectedTab === 'AboutApp') {
      this.title = this.baseService.translate('menu-list-item-AboutApp');
    }
    else if (this.selectedTab === 'guide') {
      this.title = this.baseService.translate('menu-list-item-Guidline');
    }

  }

  onTabClick(event: any) {
    this.selectedTab = event.value;
    this.title = event.title;
  }

  gotoAnchor(anchor: string) {
    var element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }

  loadCategories() {
    this.Categories = [
      {
        title: this.baseService.translate('menu-list-item-AboutApp'),
        value: 'AboutApp',
        actionUrl: '',
      },
      {
        title: this.baseService.translate('menu-list-item-ChangesApp'),
        value: 'ChangesApp',
        actionUrl: '',
      },
      {
        title: this.baseService.translate('menu-list-item-Guidline'),
        value: 'guide',
        actionUrl: '',
      }
    ];
  }
}

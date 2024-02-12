import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RoleCode } from 'src/app/definitions/models/DataTypes.model';
import { BaseService } from 'src/app/services/base.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-university-list',
  templateUrl: './university-list.page.html',
  styleUrls: ['./university-list.page.scss'],
})
export class UniversityListPage implements OnInit {

  items = [
    { id: 1, icon: 'local_library', title: this.baseService.translate('university-list-introduction') },
    { id: 2, icon: 'collections_bookmark', title: this.baseService.translate('university-list-majors') },
    { id: 3, icon: 'how_to_reg', title: this.baseService.translate('university-list-registration-guide') },
    { id: 4, icon: 'book-outline', title: this.baseService.translate('university-list-amoozeshyar-guide') },
    { id: 5, icon: 'night_shelter', title: this.baseService.translate('university-list-welfare') },
    { id: 6, icon: 'approval', title: this.baseService.translate('university-list-verification') },
    { id: 7, icon: 'call_quality', title: this.baseService.translate('university-list-contact') },
    { id: 8, icon: 'pin_drop', title: this.baseService.translate('university-list-map') },
    { id: 9, icon: 'gavel', title: this.baseService.translate('university-list-rules') },
    { id: 10, icon: 'attribution', title: this.baseService.translate('university-list-coverage') }
  ];

  constructor(private router: Router, public navCtrl: NavController, public baseService: BaseService,public storageService : StorageService) { }

  ngOnInit() {}

  ionViewWillEnter() {
    if(this.baseService.authenticated){
      this.storageService.User.Roles.forEach((el: any) => {
        if(el.Role_Code === RoleCode.StudentEnglish || el.Role_Code === RoleCode.StudentArabic || el.Role_Code === RoleCode.StudentAfghan){
          this.items = this.items.filter((item)=> item.id != 5 && item.id != 6 && item.id != 7 && item.id != 9);
        } else if(el.Role_Code === RoleCode.StudentFarsi){
          this.items = this.items.filter((item)=> item.id != 3 && item.id != 10 && item.id != 7);
        }
      });
    }
    
    else if (!this.baseService.authenticated && this.storageService.Language.Symbol === 'ar' || this.storageService.Language.Symbol === 'en') {
      this.items = this.items.filter((item)=> item.id != 5 && item.id != 6 && item.id != 7 && item.id != 9);
    }
    
    // else if(!this.baseService.authenticated && this.storageService.Language.Symbol === 'fa'){
    //   this.items = this.items.filter((item)=> item.id != 3 && item.id != 10 && item.id != 7);
    // }
  }

  openLink(id: any) {
    if (id === 6) {
      window.open('https://emt.medu.ir/', '_blank');
      this.router.navigate(['/university']);
    }
  }

}

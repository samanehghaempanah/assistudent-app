import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RoleCode } from 'src/app/definitions/models/DataTypes.model';
import { BaseService } from 'src/app/services/base.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'apv-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  @Input() title: string = '';
  @Input() isZeroNotif: boolean = false;
  @Input() isNotifsShown: boolean = false;
  @Input() backButton: 'true' | 'false' = 'false';
  isNonIranian = false;

  constructor(public baseService: BaseService,
    public navCtrl: NavController,
    public storageService: StorageService,
    public router: Router) { }

  ngOnInit() {
    if (this.baseService.authenticated) {
      this.storageService.User.Roles.forEach((el: any) => {
        if (el.Role_Code === RoleCode.StudentEnglish || el.Role_Code === RoleCode.StudentArabic || el.Role_Code === RoleCode.StudentAfghan) {
          this.isNonIranian = true;
        }
      });
    }
  }

  onBackbutton() {
    if (this.router.url.startsWith('/home/iframe')) { this.navCtrl.navigateRoot('/'); }
    else { this.navCtrl.back(); }
  }

  onGoScorePage() { this.router.navigate(['./score']); }
  onGoCreditPage() { this.router.navigate(['./wallet']); }
}

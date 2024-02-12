import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonMenu, NavController } from '@ionic/angular';
import packageJson from 'package.json';
import { environment } from 'src/environments/environment';
import { RoleCode } from './definitions/models/DataTypes.model';
import { SignalR_HUB } from './definitions/models/SignalR.model';
import { AuthenticationService } from './services/authentication.service';
import { BackButtonService } from './services/back-button.service';
import { BaseService } from './services/base.service';
import { FCMService } from './services/fcm.service';
import { LanguageService } from './services/language.service';
import { SettingService } from './services/setting.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild(IonMenu, { static: false }) menu: IonMenu | undefined;

  public ChatHUB: SignalR_HUB = new SignalR_HUB(
    environment.chatHubUrl,
    environment.chatApiUrl,
    this.storageService,
    this.baseService
  );
  version: string = packageJson.version;
  serviceVersion: number;
  classList: any;
  nextElementSibling: any;
  Roles: any[] = [];
  CurrentRole = this.storageService.Role ? this.storageService.Role.Value : 0;
  accountsOpened = false;
  isAndroid = false;
  survayMenuInfo: any;
  isChat = false;
  isNonIranian = false;
  UpdateApp: boolean = false;

  constructor(
    private router: Router,
    public navCtrl: NavController,
    private fcmService: FCMService,
    private authService: AuthenticationService,
    public baseService: BaseService,
    public storageService: StorageService,
    public languageService: LanguageService,
    private backButtonService: BackButtonService,
    public settingService: SettingService,
    private alertCtrl: AlertController,
  ) {
    this.loadDataRoles();
    this.loadTemplate();

    languageService.Language_Change(languageService.Language());

    this.backButtonService.handleExit();

    if (storageService.User) {

      this.loadDataMemberInfo().then(() => {

        this.ChatHUB.Connect();

        this.fcmService.Connect().then((fcmToken) => { if (fcmToken) { authService.FCM_Connect(fcmToken); } });
      });
    }
  }

  ngOnInit() {

    if (this.baseService.authenticated) {
      this.storageService.User.Roles.forEach((el: any) => {
        if (el.Role_Code === RoleCode.StudentEnglish || el.Role_Code === RoleCode.StudentArabic || el.Role_Code === RoleCode.StudentAfghan) { this.isNonIranian = true; }
      });
    }

    // setTimeout(() => {
    // this.isAndroid = this.baseService.isAndroidApp();
    // if (this.isAndroid) { this.onCheckVersion(); }
    // }, 3000);

    this.onCheckVersion();
  }

  async onCheckVersion() {
    try {

      let result = await this.settingService.Version_GET();

      if (result) {

        this.serviceVersion = Number(result.Value.replace('.', '').replace('.', ''));

        let appVersion = Number(this.version.replace('.', '').replace('.', ''));

        if (this.serviceVersion > appVersion) {
          this.UpdateApp = true;

          if (!this.storageService.AppVersion) { this.onInstallNewApp(); }

          else if (this.storageService.AppVersion && (this.storageService.AppVersion !== this.serviceVersion)) {
            this.onInstallNewApp();
          }

        }

      }

    } catch { }
  }

  async onInstallNewApp() {
    return new Promise(async (resolve, reject) => {
      let confirm = await this.alertCtrl.create({
        header: this.baseService.translate('install-NewVersionApp-title'),
        message: this.baseService.translate('install-NewVersionApp-message'),
        buttons: [
          {
            text: this.baseService.translate('install-NewVersionApp-btn1'),
            cssClass: 'first-button-install',
            handler: () => {
              this.router.navigate(['/download'])
            },
          },
          {
            text: this.baseService.translate('install-NewVersionApp-btn3'),
            cssClass: 'second-button-install',
            handler: () => {
              resolve('later');
            },
          },
          {
            text: this.baseService.translate('install-NewVersionApp-btn2'),
            cssClass: 'second-button-install',
            handler: () => {
              this.storageService.AppVersion = this.serviceVersion;
            },
          },
        ],
      });
      await confirm.present();

    });
  }

  ionViewWillEnter() { this.loadMenu(this.storageService.Menu); }

  closeMenu() { if (this.menu) { this.menu.close(); } }

  openAccounts() { this.accountsOpened = !this.accountsOpened; }

  openUniUrl() { window.open('https://iaun.iau.ir/', '_blank'); }

  goToVeiw() { this.router.navigate(['./chat']); }

  loadDataMemberInfo() {

    return new Promise((resolve) => {

      this.authService.Info().then((result: any) => {

        if (result) {

          this.authService.Menu().then(() => {

            this.loadMenu(this.storageService.Menu);

            resolve(true);

          });
        }
      });
    });
  }

  loadMenu(Menu: any) {

    Menu.forEach((menu: any) => {

      if (menu.Icon === "checkbox-outline") { this.survayMenuInfo = menu; }

      if (menu.URL === 'chat') { this.isChat = true; }

    });
  }

  loadDataRoles() { this.Roles = this.storageService.Roles; }

  loadTemplate() {
    switch (this.storageService.settingApp?.themeId) {
      case 1:
        {
          if (this.storageService.settingApp?.modeName === 'light') {
            this.storageService.settingApp = { themeId: 1, modeName: 'light' };
            this.baseService.changeTemplate();
          } else {
            this.storageService.settingApp = {
              themeId: 1,
              modeName: 'dark',
            };
            this.baseService.changeTemplate();
          }
        }
        break;
      case 2:
        {
          if (this.storageService.settingApp?.modeName === 'light') {
            this.storageService.settingApp = { themeId: 2, modeName: 'light' };
            this.baseService.changeTemplate();
          } else {
            this.storageService.settingApp = {
              themeId: 2,
              modeName: 'dark',
            };
            this.baseService.changeTemplate();
          }
        }
        break;
      default:
        this.storageService.settingApp = { themeId: 1, modeName: 'light' };
        this.baseService.changeTemplate();
    }
  }

  logout() {
    this.baseService
      .confirm(
        this.baseService.translate('common-alert-user'),
        this.baseService.translate('common-alert-user-exit'),
        this.baseService.translate('common-btn-logout-yes'),
        this.baseService.translate('common-btn-logout-no')
      )
      .then((confirmResult: any) => {
        if (confirmResult) {
          this.closeMenu();
          this.authService.Logout();
          this.ChatHUB.Disconnect();
          this.fcmService.Disconnect().then((fcmToken) => {
            if (fcmToken) {
              this.authService.FCM_Disconnect(fcmToken);
            }
          });
          this.navCtrl.navigateForward(['/login']);
        }
      });
  }
}
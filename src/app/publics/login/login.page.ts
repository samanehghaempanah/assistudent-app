import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import packageJson from 'package.json';
import { AppComponent } from 'src/app/app.component';
import { MenuType } from 'src/app/definitions/models/DataTypes.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BackButtonService } from 'src/app/services/back-button.service';
import { BaseService } from 'src/app/services/base.service';
import { FCMService } from 'src/app/services/fcm.service';
import { StorageService } from 'src/app/services/storage.service';
import SwiperCore, { Navigation, Pagination, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

SwiperCore.use([
  Navigation,
  Pagination
]);

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('swiper') swiper: SwiperComponent;

  version: string = packageJson.version;
  MenuType: MenuType;
  Images: any[] = [];

  PageData = {
    Waiting: false, Step: 'login' as 'login' | 'confirm',
    languages: this.baseService.languages(), timerCounter: null as any,
    Item: { Username: '', Password: '', ConfirmCode: '' },
    counter: 0, ExpireDate: ''
  };

  countDown: any;

  confirmCodes = new FormGroup({
    digit1: new FormControl('', Validators.required),
    digit2: new FormControl('', Validators.required),
    digit3: new FormControl('', Validators.required),
    digit4: new FormControl('', Validators.required),
    digit5: new FormControl('', Validators.required)
  })

  pageDataDigits = { digit1: '', digit2: '', digit3: '', digit4: '', digit5: '' };

  config: SwiperOptions = {
    navigation: {
      nextEl: '.swiper-navigation-next',
      prevEl: '.swiper-navigation-prev'
    },
  }

  pagination: any = false;

  menu: Array<any> = [];

  constructor(
    public baseService: BaseService,
    private authService: AuthenticationService,
    public storageService: StorageService,
    public navCtrl: NavController,
    private _backButton: BackButtonService,
    private route: ActivatedRoute,
    private appComponent: AppComponent,
    private fcmService: FCMService
  ) { }

  ngOnInit(): void {

    if (this.route.snapshot.paramMap.get('username')) { this.PageData.Item.Username = this.route.snapshot.paramMap.get('username'); }

    this._backButton.handleExit();

    this.Images = this.authService.Images;
    this.menu = this.authService.menu;

    if (!this.baseService.authenticated && this.baseService.language().Symbol === 'ar' || this.baseService.language().Symbol === 'en') {
      this.menu = this.menu.filter((item) => item.Id !== 1);
    } else {
      this.menu = this.menu.filter((item) => item.Id !== 2);
    }
  }

  ionViewDidEnter() { this.PageData.Step = 'login';}

  onChangeLanguage(language: any) {
    this.storageService.isWelcome = true;
    this.baseService.languageChange(language);
  }

  onChangeLanguageLogin(language: any) {
    this.baseService.languageChange(language);
    location.reload();
  }

  async onLogin() {

    this.PageData.Waiting = true;

    try {

      let result: any = await this.authService.Login(this.PageData.Item.Username, this.PageData.Item.Password);

      if (result) {

        if (result.Token) {
          // connect to chat service
          this.appComponent.ChatHUB.Connect();

          // disconnect from FCM if exist
          this.fcmService.Disconnect().then((fcmToken) => { if (fcmToken) { this.authService.FCM_Disconnect(fcmToken); } });

          // connect to FCM service
          this.fcmService.Connect().then((fcmToken) => { if (fcmToken) { this.authService.FCM_Connect(fcmToken); } });

          this.storageService.LoginStep = 'login';

          let returnURL = this.route.snapshot.queryParamMap.get('return');
          if (!returnURL) { returnURL = ''; }
          this.navCtrl.navigateRoot('/' + returnURL);
        }

        else {
          this.PageData.Step = 'confirm';
          this.storageService.LoginStep = 'confirm';
          this.onValidationTime(result);
        }

      }

    } catch { }

    this.PageData.Waiting = false;
  }

  async onLoginConfirm() {

    const confirmCodeValues = this.confirmCodes.value;

    this.PageData.Item.ConfirmCode = `${confirmCodeValues.digit1}${confirmCodeValues.digit2}${confirmCodeValues.digit3}${confirmCodeValues.digit4}${confirmCodeValues.digit5}`;

    this.PageData.Waiting = true;

    try {

      let result = await this.authService.LoginConfirm(this.PageData.Item.ConfirmCode);

      if (result) {

        // connect to chat service
        this.appComponent.ChatHUB.Connect();

        // disconnect from FCM if exist
        this.fcmService.Disconnect().then((fcmToken) => { if (fcmToken) { this.authService.FCM_Disconnect(fcmToken); } });

        // connect to FCM service
        this.fcmService.Connect().then((fcmToken) => { if (fcmToken) { this.authService.FCM_Connect(fcmToken); } });

        this.storageService.LoginStep = 'login';

        let returnURL = this.route.snapshot.queryParamMap.get('return');
        if (!returnURL) { returnURL = ''; }
        this.navCtrl.navigateRoot('/' + returnURL);

      }

    } catch { }

    this.PageData.Waiting = false;
  }

  onBack() {
    this.PageData.Step = 'login';
    this.storageService.LoginStep = 'login';
    this.pageDataDigits.digit1 = '';
    this.pageDataDigits.digit2 = '';
    this.pageDataDigits.digit3 = '';
    this.pageDataDigits.digit4 = '';
    this.pageDataDigits.digit5 = '';
    this.PageData.counter = 0;
  }

  gotoNextField(nextElement: { setFocus: () => void; }) { nextElement.setFocus(); }

  goToLink(option: any) {
    if (option.MenuType === MenuType.InnerLink) {
      this.navCtrl.navigateForward(option.URL);
    } else if (option.MenuType === MenuType.IFrame) {
      this.navCtrl.navigateForward('home/iframe/' + option.URL + '/' + option.Title);
    } else {
      window.open(option.URL, '_blank');
    }
  }

  async onValidationTime(loginResult: any) {
    this.PageData.ExpireDate = loginResult.ExpireDate;

    // Get the current system time
    let systemTime = new Date().getTime();

    // Set the Conversation_ValidFrom and ExpireDate times
    let validFrom = new Date(loginResult.ExpireDate).getTime();

    // Compare the system time with the validFrom and expireDate times
    if (systemTime < validFrom) {

      if (this.PageData.timerCounter) { clearInterval(this.PageData.timerCounter); }

      this.PageData.timerCounter = setInterval(() => {

        let remainingTime = validFrom - Date.now();

        let remainingSeconds = Math.floor(remainingTime / 1000);

        this.PageData.counter = remainingSeconds;

        if (remainingTime < 0) {
          clearInterval(this.PageData.timerCounter);
          this.PageData.counter = 0;
        }
      }, 1000)
    }
  }
}

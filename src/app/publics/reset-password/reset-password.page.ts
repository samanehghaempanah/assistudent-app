import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import packageJson from 'package.json';
import { AppComponent } from 'src/app/app.component';
import { MenuType } from 'src/app/definitions/models/DataTypes.model';
import { RegisterModel, UserDataModel } from 'src/app/definitions/models/Entities.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
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
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit, OnDestroy {
  @ViewChild('swiper') swiper: SwiperComponent;
  version: string = packageJson.version;

  emailForm = new FormGroup({
    emailorPhone: new FormControl('', Validators.required)
  })

  confirmCodes = new FormGroup({
    digit1: new FormControl('', Validators.required),
    digit2: new FormControl('', Validators.required),
    digit3: new FormControl('', Validators.required),
    digit4: new FormControl('', Validators.required),
    digit5: new FormControl('', Validators.required)
  })

  pageDataDigits = { digit1: '', digit2: '', digit3: '', digit4: '', digit5: '' };

  PageData = {
    Waiting: false, Step: 'Reset' as 'Reset' | 'Confirm' | 'setPassword' | 'submit',
    languages: this.baseService.languages(), timerCounter: null as any,
    Items: { Username: '', Password: '' },
    counter: 0, ExpireDate: '',
    resendbtn: false
  };

  entityModelPassword: RegisterModel = new RegisterModel();
  UserData: UserDataModel = new UserDataModel();
  code: any;
  countDown: any;

  //Image swiper
  Images: any[] = [];

  config: SwiperOptions = {
    navigation: {
      nextEl: '.swiper-navigation-next',
      prevEl: '.swiper-navigation-prev'
    },
  }
  pagination: any = false;
  //Image swiper

  menu: Array<any> = [];

  constructor(public baseService: BaseService,
    public storageService: StorageService,
    public router: Router,
    public authService: AuthenticationService,
    private route: ActivatedRoute,
    public navCtrl: NavController,
    private appComponent: AppComponent,
    private fcmService: FCMService
  ) { }

  ngOnInit() {
    this.Images = this.authService.Images;
    this.menu = this.authService.menu;

    if (!this.baseService.authenticated && this.baseService.language().Symbol === 'ar' || this.baseService.language().Symbol === 'en') {
      this.menu = this.menu.filter((item) => item.Id !== 1);
    } else {
      this.menu = this.menu.filter((item) => item.Id !== 2);
    }
  }

  ngOnDestroy() { this.countDown = null; }

  onChangeLanguageLogin(language: any) {
    this.baseService.languageChange(language);
    location.reload();
  }

  goToLink(option: any) {
    if (option.MenuType === MenuType.InnerLink) {
      this.navCtrl.navigateForward(option.URL);
    } else if (option.MenuType === MenuType.IFrame) {
      this.navCtrl.navigateForward('home/iframe/' + option.URL + '/' + option.Title);
    } else {
      window.open(option.URL, '_blank');
    }
  }

  async onCheckUser() {

    this.PageData.Waiting = true;

    try {

      let result: any = await this.authService.Password_Reset(this.PageData.Items);

      if (result) {
        this.entityModelPassword.Client_Id = result.Data;
        this.entityModelPassword.ExpireDate = result.ExpireDate;
        this.PageData.Step = 'setPassword';
        this.PageData.Items.Username = '';
        this.onValidationTime(result);
      }
    } catch { }

    this.PageData.Waiting = false;

  }

  onBack() {
    this.PageData.Step = 'Reset';
    this.pageDataDigits.digit1 = '';
    this.pageDataDigits.digit2 = '';
    this.pageDataDigits.digit3 = '';
    this.pageDataDigits.digit4 = '';
    this.pageDataDigits.digit5 = '';
    this.UserData.Password = '';
    this.UserData.ConfirmPassword = '';
  }

  async onSave() {

    this.PageData.Waiting = true;

    this.entityModelPassword.UserData = this.UserData;

    const confirmCodeValues = this.confirmCodes.value;

    const codeFormControl = `${confirmCodeValues.digit1}${confirmCodeValues.digit2}${confirmCodeValues.digit3}${confirmCodeValues.digit4}${confirmCodeValues.digit5}`;

    if (codeFormControl) {

      this.entityModelPassword.ConfirmCode = codeFormControl;

      try {

        let result: any = await this.authService.Password_Submit(this.entityModelPassword);

        if (result) {
          this.baseService.toast(this.baseService.translate('common-error-success'), 'success');
          this.PageData.Step = 'Reset';

          // connect to chat service
          this.appComponent.ChatHUB.Connect();

          // disconnect from FCM if exist
          this.fcmService.Disconnect().then((fcmToken) => { if (fcmToken) { this.authService.FCM_Disconnect(fcmToken); } });

          // connect to FCM service
          this.fcmService.Connect().then((fcmToken) => { if (fcmToken) { this.authService.FCM_Connect(fcmToken); } });

          let returnURL = this.route.snapshot.queryParamMap.get('return');
          if (!returnURL) { returnURL = ''; }
          this.navCtrl.navigateRoot('/' + returnURL);

        }
      } catch { }
    }

    this.PageData.Waiting = false;
  }

  gotoNextField(nextElement: { setFocus: () => void; }) { nextElement.setFocus(); }

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




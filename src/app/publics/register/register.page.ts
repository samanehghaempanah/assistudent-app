import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import packageJson from 'package.json';
import { AppComponent } from 'src/app/app.component';
import { FilteringModel } from 'src/app/definitions/models/Common.model';
import { MenuType, RegisterStepType, filteringOperationType } from 'src/app/definitions/models/DataTypes.model';
import { RegisterModel, UserDataModel } from 'src/app/definitions/models/Entities.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BaseService } from 'src/app/services/base.service';
import { CoreService } from 'src/app/services/core.service';
import { FCMService } from 'src/app/services/fcm.service';
import { StorageService } from 'src/app/services/storage.service';
import SwiperCore, { Navigation, Pagination, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

SwiperCore.use([
  Navigation,
  Pagination
]);

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @ViewChild('swiper') swiper: SwiperComponent;
  version: string = packageJson.version;

  PageData = {
    Waiting: false, Step: RegisterStepType.Signup,
    languages: this.baseService.languages(), timerCounter: null as any,
    Item: { MobileNumber: '', StudentNumber: '', NationalCode: '' }, isNoIranian: false, acceptRoles: false,
    counter: 0, ExpireDate: '',
    isModalOpen: false,
    Digits: { digit1: '', digit2: '', digit3: '', digit4: '', digit5: '' },
    countDown: null as any,
    roles: [] as any,
    countries: [] as any,
    genders: [] as any,
    languageList: [] as any,
    menu: [] as any,
    //Image swiper
    Images: [] as any,
    pagination: false,
    //Image swiper
    RegisterData: new RegisterModel() as RegisterModel,
    UserData: new UserDataModel() as UserDataModel,
    RegisterStepType: RegisterStepType,
  };

  confirmCodes = new FormGroup({
    digit1: new FormControl('', Validators.required),
    digit2: new FormControl('', Validators.required),
    digit3: new FormControl('', Validators.required),
    digit4: new FormControl('', Validators.required),
    digit5: new FormControl('', Validators.required)
  })

  config: SwiperOptions = {
    navigation: {
      nextEl: '.swiper-navigation-next',
      prevEl: '.swiper-navigation-prev'
    },
  }
  //Image swiper

  constructor(
    private router: Router,
    public navCtrl: NavController,
    public baseService: BaseService,
    public coreService: CoreService,
    public storageService: StorageService,
    private authService: AuthenticationService,
    private appComponent: AppComponent,
    private fcmService: FCMService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.PageData.Images = this.authService.Images;

    this.PageData.menu = this.authService.menu;

    if (!this.baseService.authenticated && this.baseService.language().Symbol === 'ar' || this.baseService.language().Symbol === 'en') {

      this.PageData.menu = this.PageData.menu.filter((item: any) => item.Id !== 1);

    }

    else { this.PageData.menu = this.PageData.menu.filter((item: any) => item.Id !== 2); }
  }

  async loadDate() {

    try {

      let GendersResult: any = await this.coreService.Gender_GET();

      if (GendersResult) { this.PageData.genders = GendersResult.Items; }


      this.GetCountries();
      this.GetRoles();

      let LanguagesResult: any = await this.coreService.Language_GET();

      if (LanguagesResult) { this.PageData.languageList = LanguagesResult.Items; }

    } catch { }

  }

  onChangeLanguageLogin(language: any) {
    this.baseService.languageChange(language);
    location.reload();
  }

  goToLink(option: any) {

    if (option.MenuType === MenuType.InnerLink) { this.navCtrl.navigateForward(option.URL); }

    else if (option.MenuType === MenuType.IFrame) { this.navCtrl.navigateForward('home/iframe/' + option.URL + '/' + option.Title); }

    else { window.open(option.URL, '_blank'); }
  }

  async GetCountries() {

    try {

      let myFilteringModel = new FilteringModel();

      myFilteringModel.AddCondition("ZoneType", 1, filteringOperationType.Equal);

      let result: any = await this.coreService.Zone_GET(myFilteringModel);

      if (result) { this.PageData.countries = result.Items; }

    } catch { }

  }

  async GetRoles() {

    try {

      let RoleResult: any = await this.authService.Roles();

      if (RoleResult) { this.PageData.roles = RoleResult.Items; }

    } catch { }

  }

  async onCheckUserStatus() {

    this.PageData.Waiting = true;

    if (this.PageData.Item.NationalCode || this.PageData.Item.StudentNumber) {

      try {

        let body = {
          PhoneNo: this.PageData.Item.MobileNumber,
          NationalCode: this.PageData.Item.NationalCode,
          StudentNo: this.PageData.Item.StudentNumber
        };

        let result: any = await this.authService.Register(body);

        if (result) {

          this.PageData.RegisterData = result;

          switch (this.PageData.RegisterData.RegistrationStep) {
            case 0:
              this.PageData.Step = RegisterStepType.NewUser;
              this.loadDate();
              break;
            case 1:
              this.PageData.Step = RegisterStepType.SetPassword;
              this.GetRoles();
              break
            case 2:
              this.PageData.Step = RegisterStepType.Question;
              this.GetRoles();
              break
            case 5:
              this.PageData.Step = RegisterStepType.Submit;
              this.router.navigate(['/login']);
              break
          }

          this.onValidationTime(result);
          this.PageData.Item.MobileNumber = '';
          this.PageData.Item.NationalCode = '';
          this.PageData.Item.StudentNumber = '';
          this.PageData.isNoIranian = false;
          this.PageData.acceptRoles = false;
        }

      } catch { }
    }

    else { this.baseService.toast(this.baseService.translate('signup-validation-studentOrNationalCod'), 'warning'); }

    this.PageData.Waiting = false;
  }

  onChangeBirthDate(event: any) { this.PageData.UserData.BirthDate = event; }

  async onRegister() {

    this.PageData.Waiting = true;

    try {
      let confirmCodeValues = this.confirmCodes.value;

      let codeFormControl = `${confirmCodeValues.digit1}${confirmCodeValues.digit2}${confirmCodeValues.digit3}${confirmCodeValues.digit4}${confirmCodeValues.digit5}`;

      this.PageData.RegisterData.ConfirmCode = codeFormControl;

      this.PageData.RegisterData.UserData = this.PageData.UserData;

      if (this.PageData.UserData.Password.length && this.PageData.UserData.ConfirmPassword.length >= 6) {

        let result: any = await this.authService.RegisterSubmit(this.PageData.RegisterData);

        if (result) {
          this.baseService.toast(this.baseService.translate('common-error-success'), 'success');
          this.PageData.UserData = null;
          this.PageData.RegisterData = null;
          this.PageData.Step = RegisterStepType.Signup;

          // // connect to chat service
          // this.appComponent.ChatHUB.Connect();

          // disconnect from FCM if exist
          this.fcmService.Disconnect().then((fcmToken) => { if (fcmToken) { this.authService.FCM_Disconnect(fcmToken); } });

          // connect to FCM service
          this.fcmService.Connect().then((fcmToken) => { if (fcmToken) { this.authService.FCM_Connect(fcmToken); } });

          let returnURL = this.route.snapshot.queryParamMap.get('return');

          if (!returnURL) { returnURL = ''; }

          this.navCtrl.navigateRoot('/' + returnURL);
        }
      }

      else { this.baseService.toast(this.baseService.translate('signup-password-input-placeholder'), 'warning'); }

    } catch { }

    this.PageData.Waiting = false;
  }


  gotoNextField(nextElement: { setFocus: () => void; }) { nextElement.setFocus(); }

  onNext() { this.PageData.Step = RegisterStepType.SetPassword; }

  onBack(step: any) {
    switch (step) {
      case RegisterStepType.Signup:
        this.PageData.Step = RegisterStepType.Signup;
        break;
      case 'prevStep':
        this.PageData.Digits.digit1 = '';
        this.PageData.Digits.digit2 = '';
        this.PageData.Digits.digit3 = '';
        this.PageData.Digits.digit4 = '';
        this.PageData.Digits.digit5 = '';

        if (this.PageData.RegisterData.RegistrationStep === RegisterStepType.NewUser) { this.PageData.Step = RegisterStepType.NewUser; }

        else if (this.PageData.RegisterData.RegistrationStep === RegisterStepType.Question) { this.PageData.Step = RegisterStepType.Question; }

        else this.router.navigate(['./login']);

        break
    }
  }

  inputDisable() { this.PageData.isNoIranian = !this.PageData.isNoIranian; }

  acceptRoles() { this.PageData.acceptRoles = !this.PageData.acceptRoles; }

  CheckValidFeildFirstForm() {

    if (!this.PageData.isNoIranian && this.PageData.Item.MobileNumber && (this.PageData.Item.NationalCode.length >= 10)) { return false; }

    else if (this.PageData.isNoIranian && this.PageData.Item.MobileNumber && this.PageData.Item.StudentNumber && this.PageData.acceptRoles) { return false; }

    return true
  }

  CheckValidFeildSecondForm() {
    
    if (this.PageData.UserData.FirstName && this.PageData.UserData.LastName && this.PageData.UserData.BirthDate && this.PageData.UserData.Country_Id && this.PageData.UserData.Gender_Id && this.PageData.UserData.OriginalLanguage_Id) {
      return false;
    }

    return true
  }

  async onValidationTime(RegisterResult: any) {
    this.PageData.ExpireDate = RegisterResult.ExpireDate;

    // Get the current system time
    let systemTime = new Date().getTime();

    // Set the Conversation_ValidFrom and ExpireDate times
    let validFrom = new Date(RegisterResult.ExpireDate).getTime();

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

  setOpen(isOpen: boolean) { this.PageData.isModalOpen = isOpen; }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import {
  AlertController,
  LoadingController,
  NavController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { LanguageModel, LanguageService } from './language.service';
import { StorageService } from './storage.service';
import { ActivatedRoute, Router } from '@angular/router';

type Colors =
  | 'warning'
  | 'danger'
  | 'success'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'dark';
type Positions = 'top' | 'bottom' | 'middle';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(
    private platform: Platform,
    private device: Device,
    private http: HttpClient,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private languageService: LanguageService,
    public navCtrl: NavController,
    private storageService: StorageService
  ) { }

  get authenticated() {
    if (this.storageService.User) {
      return true;
    } else {
      return false;
    }
  }

  pageName(route: ActivatedRoute) {
    return route.routeConfig?.component?.name ?? '';
  }

  pageUrl(router: Router) {
    return router?.url?.startsWith('/') ? router.url.substring(1) : router.url;
  }

  language() {
    return this.languageService.Language();
  }
  languages() {
    return [
      this.languageService.Languages.fa,
      this.languageService.Languages.en,
      this.languageService.Languages.ar,
    ];
  }
  languageChange(language: LanguageModel) {
    this.languageService.Language_Change(language);
  }

  translate(key: string): string {
    return this.languageService.Translate(key);
  }

  isNumeric(n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  isValidEmail(email: string) {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  faToEn(num: any): string {
    if (!num) {
      return '';
    } else {
      return num
        .toString()
        .replace(/۰/g, '0')
        .replace(/۱/g, '1')
        .replace(/۲/g, '2')
        .replace(/۳/g, '3')
        .replace(/۴/g, '4')
        .replace(/۵/g, '5')
        .replace(/۶/g, '6')
        .replace(/۷/g, '7')
        .replace(/۸/g, '8')
        .replace(/۹/g, '9')
        .replace(/٠/g, '0')
        .replace(/١/g, '1')
        .replace(/٢/g, '2')
        .replace(/٣/g, '3')
        .replace(/٤/g, '4')
        .replace(/٥/g, '5')
        .replace(/٦/g, '6')
        .replace(/٧/g, '7')
        .replace(/٨/g, '8')
        .replace(/٩/g, '9');
    }
  }

  toRial(price: any, showRial: boolean = false, showSign: boolean = true) {
    if (this.isNumeric(price)) {
      let str: any = price + '';
      str = str.replace(/\,/g, '');
      var objRegex = new RegExp('(-?[0-9]+)([0-9]{3})');
      while (objRegex.test(str)) {
        str = str.replace(objRegex, '$1,$2');
      }
      if (Number(price) < 0) {
        str = str.replace('-', '') + '-';
      } else if (showSign && Number(price) > 0) {
        str = str + '+';
      }
      if (showRial) {
        str = str + ' ' + this.translate('common-Currency') + ' ';
      }
      return str;
    } else {
      return price;
    }
  }

  openLink(linkUrl: string | null) {
    if (linkUrl) {
      if (linkUrl.startsWith('http')) {
        window.open(linkUrl, '_blank');
      } else {
        this.navCtrl.navigateForward(linkUrl);
      }
    }
  }

  async loading_Show(
    message: string = this.translate('common-processing'),
    duration: number = 10000
  ) {
    let loading = await this.loadingCtrl.create({
      message: message,
      duration: duration,
    });
    loading.present();
    return loading;
  }
  loading_Close(loading: HTMLIonLoadingElement) {
    if (loading != null) {
      loading.dismiss();
    }
  }

  async toast(
    message: string,
    color: Colors = 'warning',
    buttonText: string = '',
    duration: number = 4000,
    position: Positions = 'bottom'
  ) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position,
      color: color,
      buttons: buttonText
        ? [{ text: buttonText, role: 'cancel', side: 'start' }]
        : undefined,
    });
    toast.present();
  }

  async alert(
    title: string,
    message: string,
    submitButtonText: string
  ) {
    return new Promise(async (resolve) => {
      const confirm = await this.alertCtrl.create({
        header: title,
        message: message,
        buttons: [
          {
            text: submitButtonText,
            cssClass: 'first-button',
            handler: () => {
              resolve(true);
            },
          }
        ],
      });
      await confirm.present();
    });
  }

  async confirm(title: string, message: string, submitButtonText: string, cancelButtonText: string) {
    return new Promise(async (resolve, reject) => {
      const confirm = await this.alertCtrl.create({
        header: title,
        message: message,
        buttons: [
          {
            text: submitButtonText,
            cssClass: 'first-button',
            handler: () => {
              resolve(true);
            },
          },
          {
            text: cancelButtonText,
            cssClass: 'second-button',
            handler: () => {
              resolve(false);
            },
          },
        ],
      });
      await confirm.present();
    });
  }

  async inputConfirm(
    title: string,
    message: string,
    inputPlaceholder: string,
    inputValue: string,
    submitButtonText: string,
    cancelButtonText: string
  ) {
    return new Promise(async (resolve, reject) => {
      const confirm = await this.alertCtrl.create({
        header: title,
        message: message,
        cssClass: 'ShowInputConfirm',
        inputs: [
          {
            name: 'txtinput1',
            type: 'text',
            value: inputValue,
            placeholder: inputPlaceholder,
          },
        ],
        buttons: [
          {
            text: submitButtonText,
            handler: (alertData) => {
              resolve({
                submit: true,
                value:
                  alertData == null || alertData.txtinput1 == null
                    ? ''
                    : alertData.txtinput1.trim(),
              });
            },
          },
          {
            text: cancelButtonText,
            handler: () => {
              resolve({ submit: false });
            },
          },
        ],
      });
      await confirm.present();
    });
  }

  private getHttpHeader() {
    return {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type',
      Accept: 'application/json',
    };
  }

  httpGET(serviceUrl: string, body: any = null, showLoadingPopup: boolean = false, apiRootUrl: string = environment.apiUrl) {
    return new Promise(async (resolve, reject) => {
      let loading: any; if (showLoadingPopup) { loading = await this.loading_Show(); }
      if (body) {
        let dataParams = new HttpParams().set('serviceData', JSON.stringify(body));
        this.http.get(apiRootUrl + serviceUrl, { headers: this.getHttpHeader(), params: dataParams, }).subscribe((res: any) => { if (showLoadingPopup && loading) { this.loading_Close(loading); } resolve(res.Result); }, (err) => { if (showLoadingPopup && loading) { this.loading_Close(loading); } reject(err); });
      }
      else {
        this.http.get(apiRootUrl + serviceUrl, { headers: this.getHttpHeader(), }).subscribe((res: any) => { if (showLoadingPopup && loading) { this.loading_Close(loading); } resolve(res.Result); }, (err) => { if (showLoadingPopup && loading) { this.loading_Close(loading); } reject(err); });
      }
    });
  }

  httpPOST(serviceUrl: string, body: any, showLoadingPopup: boolean = false) {
    return new Promise(async (resolve, reject) => {
      let loading: any;
      if (showLoadingPopup) {
        loading = await this.loading_Show();
      }
      this.http
        .post(
          environment.apiUrl + serviceUrl,
          body ? JSON.stringify(body) : {},
          { headers: this.getHttpHeader() }
        )
        .subscribe(
          (res: any) => {
            if (showLoadingPopup && loading) {
              this.loading_Close(loading);
            }
            resolve(res.Result);
          },
          (err) => {
            if (showLoadingPopup && loading) {
              this.loading_Close(loading);
            }
            reject(err);
          }
        );
    });
  }

  httpPUT(serviceUrl: string, body: any, showLoadingPopup: boolean = false) {
    return new Promise(async (resolve, reject) => {
      let loading: any;
      if (showLoadingPopup) {
        loading = await this.loading_Show();
      }
      this.http
        .put(
          environment.apiUrl + serviceUrl,
          body ? JSON.stringify(body) : {},
          { headers: this.getHttpHeader() }
        )
        .subscribe(
          (res: any) => {
            if (showLoadingPopup && loading) {
              this.loading_Close(loading);
            }
            resolve(res.Result);
          },
          (err) => {
            if (showLoadingPopup && loading) {
              this.loading_Close(loading);
            }
            reject(err);
          }
        );
    });
  }

  httpDELETE(serviceUrl: string, showLoadingPopup: boolean = false) {
    return new Promise(async (resolve, reject) => {
      let loading: any;
      if (showLoadingPopup) {
        loading = await this.loading_Show();
      }
      this.http
        .delete(environment.apiUrl + serviceUrl, {
          headers: this.getHttpHeader(),
        })
        .subscribe(
          (res: any) => {
            if (showLoadingPopup && loading) {
              this.loading_Close(loading);
            }
            resolve(res.Result);
          },
          (err) => {
            if (showLoadingPopup && loading) {
              this.loading_Close(loading);
            }
            reject(err);
          }
        );
    });
  }

  httpUploadFILE(image: any) {
    const formData = new FormData();
    formData.append('file', image);
    return this.http.post(environment.apiUrl + 'File', formData).toPromise();
  }

  private _isAndroidApp: any = null;

  isAndroidApp(): boolean {
    this._isAndroidApp = false;

    if ((this.platform.is('cordova') && this.platform.is('android')) && (this.device && this.device.uuid && this.device.uuid.length > 0)) {
      this._isAndroidApp = true;
    }
    return this._isAndroidApp;
  }

  // isAndroidApp(): boolean {

  //   if (this._isAndroidApp == null) { this._isAndroidApp = (this.device.uuid && this.device.uuid.length > 0) ? true : false; }

  //   return this._isAndroidApp;



  //   //   this._isAndroidApp = false;

  //   //   // if ((this.platform.is('cordova') ||
  //   //   //   this.platform.is('android')) &&
  //   //   //   this.device != null &&
  //   //   //   this.device.uuid != null &&
  //   //   //   this.device.uuid.length > 0) {
  //   //   //   this._isAndroidApp = true;
  //   //   // }

  //   //   this.platform.ready().then(() => {

  //   //     if (this.platform.is('android')) { this._isAndroidApp = true; }

  //   //     else if (this.platform.is('ios')) { this._isAndroidApp = false; }

  //   //     else {
  //   //       //fallback to browser APIs or
  //   //       // console.log('The platform is not supported');
  //   //       this._isAndroidApp = false;
  //   //     }
  //   //   });
  //   //   return this._isAndroidApp;
  //   // }
  // }

  isPwaApp(): boolean {
    let isPwa = false;
    if (this.platform.is('pwa')) {
      isPwa = true;
    }
    return isPwa;
  }

  loadImage(
    fileName: string | null,
    imageType: 'Profile' | 'Banner' | 'Common'
  ) {
    if (fileName) {
      if (fileName.startsWith('http')) {
        return fileName;
      }
      return environment.downloadUrl + fileName;
    }
    switch (imageType) {
      case 'Profile':
        return './assets/icon/avatar.png';
        break;
      default:
        return './assets/icon/favicon.png';
        break;
    }
  }

  takePicture_Resize(maxSize: number) {
    return new Promise((resolve, reject) => {
      var fileuploader: any;
      fileuploader = document.getElementById('fileuploader');

      fileuploader.addEventListener('change', function handler(e: any) {
        var file = fileuploader.files[0];
        if (file != null && file.type.match(/image.*/)) {
          var reader = new FileReader();
          reader.onload = function (readerEvt: any) {
            var img2 = new Image();
            img2.onload = () => {
              // Resize the image
              var canvas = document.createElement('canvas'),
                max_size = maxSize,
                width = img2.width,
                height = img2.height;

              if (width > height) {
                if (width > max_size) {
                  height *= max_size / width;
                  width = max_size;
                }
              } else {
                if (height > max_size) {
                  width *= max_size / height;
                  height = max_size;
                }
              }

              canvas.width = width;
              canvas.height = height;

              let CantObject = canvas.getContext('2d');
              if (CantObject) {
                CantObject.drawImage(img2, 0, 0, width, height);
              }

              resolve(canvas.toDataURL(file.type));
            };

            img2.src = readerEvt.target.result;
          };

          reader.readAsDataURL(file);
        }

        fileuploader.removeEventListener('change', handler);
      });

      fileuploader.click();
    });
  }

  changeTemplate() {
    switch (this.storageService.settingApp.themeId) {
      case 1:
        {
          if (this.storageService.settingApp.modeName === 'light') {
            document.getElementsByTagName('body')[0].classList.remove('secondTheme', 'firstDarkMode', 'secondDarkMode');
            document.getElementsByTagName('body')[0].classList.add('firstTheme');
            this.storageService.settingApp = { themeId: 1, modeName: 'light' };
          }
          else {
            document.getElementsByTagName('body')[0].classList.remove('firstTheme', 'secondTheme', 'secondDarkMode');
            document.getElementsByTagName('body')[0].classList.add('firstDarkMode');
            this.storageService.settingApp = { themeId: 1, modeName: 'dark' };
          }
        }
        break;
      case 2:
        {
          if (this.storageService.settingApp.modeName === 'light') {
            document.getElementsByTagName('body')[0].classList.remove('firstTheme', 'firstDarkMode', 'secondDarkMode');
            document.getElementsByTagName('body')[0].classList.add('secondTheme');
            this.storageService.settingApp = { themeId: 2, modeName: 'light' };
          }
          else {
            document.getElementsByTagName('body')[0].classList.remove('firstTheme', 'secondTheme', 'firstDarkMode');
            document.getElementsByTagName('body')[0].classList.add('secondDarkMode');
            this.storageService.settingApp = { themeId: 2, modeName: 'dark' };
          }
        }
        break;
    }
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() { }

  Logout() {
    let oldLanguage = this.Language;
    let oldisWelcome = this.isWelcome;
    let oldPwaInstalled = this.PwaInstalled;
    let oldPwaDontShowPopup = this.PwaDontShowPopup;
    let oldsettingApp = this.settingApp;

    localStorage.clear();

    this.Language = oldLanguage;
    this.isWelcome = oldisWelcome;
    this.PwaInstalled = oldPwaInstalled;
    this.PwaDontShowPopup = oldPwaDontShowPopup;
    this.settingApp = oldsettingApp;
  }

  public get User() { return localStorage.getItem('behdadstudentUser') ? JSON.parse(localStorage.getItem('behdadstudentUser') || '{}') : null; }
  public set User(value: any) {
    if (this.Authorities) { value.authority = this.Authorities; }
    localStorage.setItem('behdadstudentUser', JSON.stringify(value));
  }
  public get Authorities() { return this.User ? this.User.authority : null; }


  public set Token(value: any) { localStorage.setItem('behdadstudentToken', JSON.stringify(value)); }
  public get Token() {
    var token = localStorage.getItem('behdadstudentToken') ? JSON.parse(localStorage.getItem('behdadstudentToken') || '{}') : null;
    return (token) ? token.Token : null;
  }
  public get TokenExpireDate() {
    var token = localStorage.getItem('behdadstudentToken') ? JSON.parse(localStorage.getItem('behdadstudentToken') || '{}') : null;
    return (token) ? token.ExpireDate : null;
  }

  public set ConfirmToken(value: any) { localStorage.setItem('behdadstudentConfirmToken', JSON.stringify(value)); }
  public get ConfirmToken() { return localStorage.getItem('behdadstudentConfirmToken') ? JSON.parse(localStorage.getItem('behdadstudentConfirmToken') || '{}') : null; }

  public set Menu(value: any) { localStorage.setItem('behdadstudentMenu', JSON.stringify(value)); }
  public get Menu() { return localStorage.getItem('behdadstudentMenu') ? JSON.parse(localStorage.getItem('behdadstudentMenu') || '{}') : null; }

  public set fcmToken(value: any) { localStorage.setItem('behdadstudentfcmToken', value); }
  public get fcmToken() { return localStorage.getItem('behdadstudentfcmToken'); }


  public set Language(value: any) { localStorage.setItem('behdadstudentLanguage', JSON.stringify(value)); }
  public get Language() { return localStorage.getItem('behdadstudentLanguage') ? JSON.parse(localStorage.getItem('behdadstudentLanguage') || '{}') : null; }

  public set Roles(value: any) { localStorage.setItem('behdadstudentRoles', JSON.stringify(value)); }
  public get Roles() { return localStorage.getItem('behdadstudentRoles') ? JSON.parse(localStorage.getItem('behdadstudentRoles') || '{}') : null; }

  public set Role(value: any) { localStorage.setItem('behdadstudentRole', JSON.stringify(value)); }
  public get Role() { return localStorage.getItem('behdadstudentRole') ? JSON.parse(localStorage.getItem('behdadstudentRole') || '{}') : null; }

  public set LoginStep(value: any) { localStorage.setItem('behdadstudentLoginStep', value); }
  public get LoginStep() { return localStorage.getItem('behdadstudentLoginStep'); }

  public set isWelcome(value: any) { localStorage.setItem('behdadstudentIsWelcome', value); }
  public get isWelcome() { return localStorage.getItem('behdadstudentIsWelcome'); }

  public set Chats(value: any) { localStorage.setItem('behdadstudentChats', JSON.stringify(value)); }
  public get Chats(): any[] { return (localStorage.getItem('behdadstudentChats')) ? JSON.parse(localStorage.getItem('behdadstudentChats') || '{}') : []; }

  public setChatMessages(chatId: string, value: any) { localStorage.setItem('behdadstudentChatMessages-' + chatId, JSON.stringify(value)); }
  public getChatMessages(chatId: string): any[] { return (localStorage.getItem('behdadstudentChatMessages-' + chatId)) ? JSON.parse(localStorage.getItem('behdadstudentChatMessages-' + chatId) || '{}') : []; }

  public set visaStatus(value: any) { localStorage.setItem('behdadstudentVisaStatus', value); }
  public get visaStatus() { return localStorage.getItem('behdadstudentVisaStatus'); }

  public set LikeHistory(value: any) { localStorage.setItem('behdadstudentLikeHistory', JSON.stringify(value)); }
  public get LikeHistory() { return (localStorage.getItem('behdadstudentLikeHistory')) ? JSON.parse(localStorage.getItem('behdadstudentLikeHistory') || '{}') : null; }

  public set visaStatusRequest(value: any) { localStorage.setItem('behdadstudentvisaStatusRequest', value); }
  public get visaStatusRequest() { return localStorage.getItem('behdadstudentvisaStatusRequest'); }

  public set resetPassword(value: any) { localStorage.setItem('behdadstudentresetPassword', value); }
  public get resetPassword() { return localStorage.getItem('behdadstudentresetPassword'); }
  removeresetPassword() { localStorage.removeItem('behdadstudentresetPassword'); }

  public set ConfirmCode(value: any) { localStorage.setItem('behdadstudentConfirmCode', value); }
  public get ConfirmCode() { return localStorage.getItem('behdadstudentConfirmCode'); }
  removeConfirmCode() { localStorage.removeItem('behdadstudentConfirmCode'); }

  public set hideTrackNotification(value: any) { localStorage.setItem('hideTrackNotification', value); }
  public get hideTrackNotification() { return localStorage.getItem('hideTrackNotification'); }
  removesettingApp() { localStorage.removeItem('hideTrackNotification'); }

  public set settingApp(value: any) { localStorage.setItem('behdadstudentSettingApp', JSON.stringify(value)); }
  public get settingApp() { return (localStorage.getItem('behdadstudentSettingApp')) ? JSON.parse(localStorage.getItem('behdadstudentSettingApp') || '{}') : null; }

  public set PwaDontShowPopup(value: any) { (value) ? localStorage.setItem('behdadstudentPwaDontShowPopup', value) : localStorage.removeItem('behdadstudentPwaDontShowPopup'); }
  public get PwaDontShowPopup(): any { return (localStorage.getItem('behdadstudentPwaDontShowPopup')) ? JSON.parse(localStorage.getItem('behdadstudentPwaDontShowPopup') || '{}') : null; }

  public set PwaInstalled(value: any) { (value) ? localStorage.setItem('behdadstudentPwaInstalled', value) : localStorage.removeItem('behdadstudentPwaInstalled'); }
  public get PwaInstalled() { return (localStorage.getItem('behdadstudentPwaInstalled')) ? JSON.parse(localStorage.getItem('behdadstudentPwaInstalled') || '{}') : null; }

  public set AppVersion(value: any) { localStorage.setItem('behdadstudentAppVersion', JSON.stringify(value)); }
  public get AppVersion() { return (localStorage.getItem('behdadstudentAppVersion')) ? JSON.parse(localStorage.getItem('behdadstudentAppVersion') || '{}') : null; }
}

import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
import { App } from '@capacitor/app';
import { BaseService } from './base.service';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class BackButtonService {
  constructor(
    private router: Router,
    private location:Location,
    public baseService: BaseService) { }

    handleExit(){
      document.addEventListener("backbutton", () =>{
        if(this.router.url == "/home"){
          this.baseService
          .confirm(
            this.baseService.translate('common-alert-user'),
            this.baseService.translate('common-alert-user-exit-app'),
            this.baseService.translate('common-btn-logout-yes'),
            this.baseService.translate('common-btn-logout-no')
          )
          .then((confirmResult: any) => {
            if (confirmResult) {
              (navigator as any).app.exitApp();
            }
          });
        }else{
          this.location.back()
        }
      }, false);
    }

}

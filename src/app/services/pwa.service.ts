import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { SwUpdate } from '@angular/service-worker';

@Injectable({ providedIn: 'root' })
export class PwaService {

  private installPromptEvent: any;

  public show: boolean = true;

  constructor(
    private storageService: StorageService,
    public baseService: BaseService,
    private serviceWorkerService: SwUpdate
  ) {
    this.listenToInstallAppEvent();
  }

  public get Installed() {
    return (this.storageService.PwaInstalled);
    // if (
    //   window.matchMedia('(display-mode: standalone)').matches ||
    //   'standalone' in window.navigator ||
    //   this.storageService.PwaInstallStatus
    // ) {
    //   this.isAppInstalled = true;
    // }
  }
  public set Installed(value: boolean) { this.storageService.PwaInstalled = value; }

  public get ShowPopup() { if (this.baseService.isAndroidApp() || this.Installed) { return false; } return !(this.storageService.PwaDontShowPopup); }
  public set ShowPopup(value: boolean) { this.storageService.PwaDontShowPopup = !value; }

  public async checkForUpdate() {
    const updateFound = await this.serviceWorkerService.checkForUpdate();
    return updateFound;
  }

  private listenToInstallAppEvent() {

    fromEvent(window, 'beforeinstallprompt')
      .pipe(
        tap((event: any) => {
          event.preventDefault();
          this.installPromptEvent = event;
        })
      )
      .subscribe();
  }

  public Install() {
    return new Promise((resolve, reject) => {
      if (this.installPromptEvent) {
        this.installPromptEvent.prompt();
        this.installPromptEvent.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
            this.baseService.toast(
              this.baseService.translate('pwa-install-success'),
              'success'
            );
            this.Installed = true;
            resolve(true);
          } else {
            reject(true);
            this.baseService.toast(
              this.baseService.translate('pwa-install-canceled'),
              'danger'
            );
          }
          this.installPromptEvent = null;
        });
      } else {
        this.baseService.toast(
          this.baseService.translate('pwa-install-unavailable'),
          'warning'
        );
      }
    });
  }

  public Uninstall() {
    this.Installed = false;
  }
}

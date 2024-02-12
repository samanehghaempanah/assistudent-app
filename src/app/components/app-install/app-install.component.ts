import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';
import { PwaService } from 'src/app/services/pwa.service';

@Component({
  selector: 'app-install',
  templateUrl: 'app-install.component.html',
  styleUrls: ['./app-install.component.scss'],
})
export class AppInstallComponent implements OnInit {
  constructor(
    public baseService: BaseService,
    public pwaService: PwaService,
    public router: Router
  ) { }

  ngOnInit() {
    this.checkForUpdate();
  }

  public onInstallPWA() {
    this.router.navigateByUrl('/download');
  }

  public onDontShowPWA() {
    this.pwaService.ShowPopup = false;
  }

  private checkForUpdate() {
    this.pwaService.checkForUpdate().then((value) => {
      console.log("checkForUpdate", value);
      if (value) {

        this.baseService.alert(
          this.baseService.translate('pwa-update-title'),
          this.baseService.translate('pwa-install-prompt'),
          this.baseService.translate('common-btn-confirm'))

          .then(() => { document.location.reload(); });
      }
    });
  }
}

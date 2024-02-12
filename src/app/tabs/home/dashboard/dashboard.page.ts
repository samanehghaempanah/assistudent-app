import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsComponent } from 'src/app/components/news/news.component';
import { NotificationComponent } from 'src/app/components/notification/notification.component';
import { SliderModel } from 'src/app/definitions/models/Common.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BaseService } from 'src/app/services/base.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  PageData = {
    Waiting: false, Loaded: false,
    isNotifEmpty: false,
    isNotifsShown: false,
    Ads: [] as SliderModel[]
  }

  @ViewChild(NotificationComponent, { static: false }) notificationComponent: NotificationComponent | undefined;
  @ViewChild(NewsComponent, { static: false }) newsComponent: NewsComponent | undefined;

  constructor(
    public baseService: BaseService,
    public storageService: StorageService,
    private notificationService: NotificationService,
    public authenticationService : AuthenticationService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.authenticationService.Info();
    this.notificationComponent.loadData();
    this.newsComponent.loadData();
    this.loadAds();
  }

  async loadAds() {
    this.PageData.Waiting = true;

    try {

      let result: any = await this.notificationService.Ads_Get();

      if (result) { this.PageData.Ads = result.Items; }

    } catch { }

    this.PageData.Waiting = false;
    this.PageData.Loaded = true;
  }

  getNotifStatus(status: boolean) { this.PageData.isNotifEmpty = status; }

  getNotifsShownStatus(status: boolean) { this.PageData.isNotifsShown = status; }

}

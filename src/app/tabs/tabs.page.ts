import { Component, Input } from '@angular/core';
import { BaseService } from '../services/base.service';
import { NotificationService } from '../services/notification.service';
import { StorageService } from '../services/storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  @Input() NotificationRead: boolean = false;

  notificationCount: number = 0;
  chatCount: number = 0;
  isClassroom = false;
  isChat = false;
  constructor(
    public baseService: BaseService,
    public notificationService: NotificationService,
    private storageService: StorageService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.storageService.Menu.forEach((element: any) => {
      if (element.URL === 'classroom') {
        this.isClassroom = true;
      }
      if (element.URL === 'chat') {
        this.isChat = true;
      }
    });
    this.loadChatsUnread();
    this.loadNotificationsUnread();
  }

  tabChanged(tab: any) {
    this.loadNotificationsUnread();
    this.loadChatsUnread();
  }

  loadChatsUnread() { this.chatCount = 0; }

  loadNotificationsUnread() {
    this.notificationService.Unread_GET().then((result: any) => {
      this.notificationCount = result.Value;
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: this.baseService.translate('common-alert-user'),
      message: this.baseService.translate('chat-alert-text'),
      buttons: [this.baseService.translate('track-form-title-3-btn-tool')],
    });

    await alert.present();
  }

}

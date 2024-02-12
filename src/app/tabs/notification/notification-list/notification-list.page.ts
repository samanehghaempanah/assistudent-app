import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, ModalController, NavController } from '@ionic/angular';
import {
  FilteringModel,
  ListResultModel,
  ScrollableTabModel,
} from 'src/app/definitions/models/Common.model';
import { filteringOperationType } from 'src/app/definitions/models/DataTypes.model';
import { NotificationModel } from 'src/app/definitions/models/Entities.model';
import { BaseService } from 'src/app/services/base.service';
import { StorageService } from 'src/app/services/storage.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ImageViewerComponent } from 'src/app/components/image-viewer/image-viewer.component';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.page.html',
  styleUrls: ['./notification-list.page.scss'],
})
export class NotificationListPage implements OnInit {
  Categories: ScrollableTabModel[] = [];
  selectedTab: any = 0;
  search: any;
  Notifications: NotificationModel[] = [];
  nofiticationSavedList: any[] = [];
  showNofiticationSavedList = false;
  imageSrc = '';
  showTitle = false;
  showDescription = false;
  notifyId = -1;

  listModel: ListResultModel = new ListResultModel();
  filteringModel: FilteringModel = new FilteringModel();

  constructor(
    public baseService: BaseService,
    private notificationService: NotificationService,
    public storageService: StorageService,
    private modalCtrl: ModalController,
    private navCtrl : NavController
  ) { }

  ionViewWillEnter() {
    this.loadCategory();
    this.loadData();
  }

  loadCategory() {
    this.notificationService.Category_GET().then((result: any) => {
      if (result?.Items) {
        let tempCategories: ScrollableTabModel[] = [];

        tempCategories.push(
          {
            title: this.baseService.translate('common-scrollabletab-allitems'),
            actionUrl: '',
            value: 0,
          },
          {
            title: this.baseService.translate('common-scrollabletab-saved'),
            actionUrl: '',
            value: -1,
          }
        );

        result.Items.forEach((element: any) => {
          tempCategories.push({
            title: element.Title,
            actionUrl: '',
            value: element.Id,
          });
        });

        this.Categories = tempCategories;
      }
    });
  }

  loadData(event: any = null) {
    // next page or reload Items
    if (event) {
      this.filteringModel.PageNumber++;
    } else {
      this.filteringModel.PageNumber = 1;
    }

    this.notificationService
      .GET(this.filteringModel)
      .then((result: any) => {
        if (result) {
          // set Items
          if (result.Items) {
            // append next page items
            if (event) {
              this.listModel.CurrentPage = result.CurrentPage;
              this.listModel.HasNext = result.HasNext;
              this.listModel.HasPrevious = result.HasPrevious;
              this.listModel.TotalPages = result.TotalPages;
              this.listModel.TotalCount = result.TotalCount;
              result.Items.forEach((value: any) => {
                this.listModel.Items.push(value);
                value.Description.length > 100
                  ? (value.hasMore = true)
                  : (value.hasMore = false);
              });
              this.loadSavedNotifications();
            }
            // reload Items
            else {
              this.listModel = result;
              this.listModel.Items.forEach(function (value) {
                value.Description.length > 100
                  ? (value.hasMore = true)
                  : (value.hasMore = false);
              });
              this.loadSavedNotifications();
            }
          }

          // set page filtering
          this.filteringModel.PageNumber = result.CurrentPage;
          this.filteringModel.PageSize = result.PageSize;
        }
        this.search.setFocus();
      })
      .finally(() => {
        if (event != null) {
          event.target.complete();
        }
      });
  }

  loadSavedNotifications() {
    this.nofiticationSavedList = this.listModel.Items.filter(
      (item) => item.HasSave === true
    );
  }

  ngOnInit() { }

  onMouseEnter(notification: any) {
    if (notification.HasView === false) {
      this.notificationService
        .View_POST(notification.Id)
        .then((result: any) => { });
    }
  }

  onTabClick(event: any) {
    if (event.value === -1) {
      this.nofiticationSavedList = [];
      this.loadSavedNotifications();
      this.showNofiticationSavedList = true;
    } else if (event.value === 0) {
      this.showNofiticationSavedList = false;
      this.filteringModel.RemoveCondition('Category_Id');
    } else {
      this.showNofiticationSavedList = false;
      this.notificationService;
      this.filteringModel.AddCondition(
        'Category_Id',
        event.value,
        filteringOperationType.Equal
      );
    }
    this.loadData();
  }

  onSearchClick(event: any) {
    if (!event || event.detail.value.trim().length == 0) {
      this.filteringModel.RemoveCondition('Title');
    } else {
      this.filteringModel.AddCondition(
        'Title',
        event.detail.value.trim(),
        filteringOperationType.Contain
      );
    }
    this.search = event.srcElement;
    this.loadData();
  }

  clickLike(notification: any) {
    if (notification.HasLike === false) {
      this.notificationService
        .Like_POST(notification.Id)
        .then((result: any) => {
          if (result) {
            var index = this.listModel.Items.findIndex(
              (notif) => notif.Id === notification.Id
            );
            this.listModel.Items[index] = result;
          }
        });
    } else if (notification.HasLike === true) {
      this.notificationService
        .UnLike_POST(notification.Id)
        .then((result: any) => {
          if (result) {
            var index = this.listModel.Items.findIndex(
              (notif) => notif.Id === notification.Id
            );
            this.listModel.Items[index] = result;
          }
        });
    }
  }

  saveNotif(notification: any) {
    if (notification.HasSave === false) {
      this.nofiticationSavedList.push(notification);
      this.notificationService
        .Save_POST(notification.Id)
        .then((result: any) => {
          if (result) {
            var index = this.listModel.Items.findIndex(
              (notif) => notif.Id === notification.Id
            );
            this.listModel.Items[index] = result;
            this.loadSavedNotifications();
          }
        });
    } else if (notification.HasSave === true) {
      this.nofiticationSavedList = this.nofiticationSavedList.filter(
        (item) => item.Id !== notification.Id
      );
      this.notificationService
        .UnSave_POST(notification.Id)
        .then((result: any) => {
          if (result) {
            var index = this.listModel.Items.findIndex(
              (notif) => notif.Id === notification.Id
            );
            this.listModel.Items[index] = result;
            this.loadSavedNotifications();
          }
        });
    }
  }

  async onShowImage(notify: any) {
    this.imageSrc = notify.MainFile;
    const modal = await this.modalCtrl.create({
      component: ImageViewerComponent,
      componentProps: { imgSrc: this.imageSrc },
    });
    modal.present();
  }

  titleClick(notification: any) {
    this.notifyId = notification.Id;
    this.showTitle = !this.showTitle;
  }

  descriptionClick(notification: any) {
    this.notifyId = notification.Id;
    this.showDescription = !this.showDescription;
  }

  goToLink(option: any) {

    if (option.Link.startsWith('https://') || option.Link.startsWith('http://') || option.Link.startsWith('www')) {
      window.open(option.Link, '_blank');
    }

    else { this.navCtrl.navigateForward(option.Link); }
  }
}

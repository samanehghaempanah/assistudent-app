import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { FilteringModel } from 'src/app/definitions/models/Common.model';
import { NotificationModel } from 'src/app/definitions/models/Entities.model';
import { BaseService } from 'src/app/services/base.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'apv-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @Output() isNotifEmpty = new EventEmitter<boolean>();
  @Output() isNotifListShown = new EventEmitter<boolean>();

  PageData = {
    Loaded: false, showNofiticationSavedList: false,
    panelOpenState: false, display: false,
    Notifications: [] as any,
    Notification: new NotificationModel(),
    nofiticationSavedList: [] as any,
  }

  constructor(public baseService: BaseService,
    private notificationService: NotificationService,
    public storageService: StorageService,
    public router: Router) { }

  ngOnInit() { this.loadData(); }

  async loadData() {

    this.PageData.Loaded = false;

    try {

      let filteringModel: FilteringModel = new FilteringModel();
      filteringModel.PageSize = 3;

      let result: any = await this.notificationService.GET(filteringModel);

      if (result) {
        this.PageData.Notifications = result.Items;
        this.PageData.Notification = result.Items[0];
        this.isNotifEmpty.emit(this.PageData.Notifications.length === 0 ? true : false);
      }

    } catch { }

    this.PageData.Loaded = true;
  }

  openAll() {
    this.accordion.openAll()
    this.PageData.display = true;
    this.isNotifListShown.emit(this.PageData.display)
  }

  closeAll() {
    this.accordion.closeAll()
    this.PageData.display = false;
    this.isNotifListShown.emit(this.PageData.display)
  }

  onGoTONotification() { this.router.navigate(['./notification']); }
}

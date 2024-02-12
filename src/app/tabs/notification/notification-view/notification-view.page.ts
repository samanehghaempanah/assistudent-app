import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-notification-view',
  templateUrl: './notification-view.page.html',
  styleUrls: ['./notification-view.page.scss'],
})
export class NotificationViewPage implements OnInit {

  constructor(public baseService: BaseService) { }

  ngOnInit() {
  }

}

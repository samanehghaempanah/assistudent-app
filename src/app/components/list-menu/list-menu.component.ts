import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MenuType } from 'src/app/definitions/models/DataTypes.model';
import { ListMenuOptionModel } from 'src/app/definitions/models/Entities.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BaseService } from '../../services/base.service';
import { StorageService } from './../../services/storage.service';

@Component({
  selector: 'apv-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.scss']
})
export class ListMenuComponent implements OnInit {
  MenuType = MenuType;

  @Input() displayDropdown: boolean = false;
  @Input() displayScroll: boolean = false;
  displayPackages: boolean = false;

  menu: Array<ListMenuOptionModel> = [];
  options: Array<ListMenuOptionModel> = [];
  moreOptions: Array<ListMenuOptionModel> = []

  private subscriptions = new Subscription();

  constructor(
    public baseService: BaseService,
    private storageService: StorageService,
    public navCtrl: NavController,
    private authService: AuthenticationService,
    public router: Router) { }

  goToLink(option: any) {

    if (!option.Disable) {

      if (option.MenuType === MenuType.InnerLink) {
        this.navCtrl.navigateForward(option.URL);
      }

      else if (option.MenuType === MenuType.IFrame) {
        this.navCtrl.navigateForward('home/iframe/' + option.URL + '/' + option.Title);
      }

      else { window.open(option.URL, '_blank'); }
    }
  }

  ngOnInit() {
    this.subscriptions.add(this.authService.onMenuChanged$.subscribe((data: any) => { this.loadMenu(data); }));

    this.loadMenu(this.storageService.Menu);
  }

  ngOnDestroy() { this.subscriptions.unsubscribe(); }

  loadMenu(data: any) {
    this.menu = data.filter((item: any) => item.Icon != "checkbox-outline");

    this.moreOptions = data.filter((item: any) => item.MenuType === MenuType.OuterLink);

    this.options = data.filter((item: any) => item.MenuType !== MenuType.OuterLink);
  }
}


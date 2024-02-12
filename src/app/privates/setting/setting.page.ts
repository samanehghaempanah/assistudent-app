import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';
import { PwaService } from 'src/app/services/pwa.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-setting',
  templateUrl: 'setting.page.html',
  styleUrls: ['setting.page.scss'],
})
export class SettingPage implements OnInit {
  
  blueThemeSelected: boolean = this.storageService.settingApp?.themeId === 1;
  orangeThemeSelected: boolean = this.storageService.settingApp?.themeId === 2;
  lightModeSelected: boolean =    this.storageService.settingApp?.modeName === 'light';
  darkModeSelected: boolean =    this.storageService.settingApp?.modeName === 'dark';

  PageData = {    languages: this.baseService.languages()  };

  constructor(
    public route: ActivatedRoute,
    public baseService: BaseService,
    public storageService: StorageService,
    public pwaService: PwaService
  ) {}

  ngOnInit() {  }

  onChangeLanguage(language: any) {
    this.baseService.languageChange(language);
    location.reload();
  }

  onChangeTemplate(theme: number, mode: string) {
    this.storageService.settingApp = { themeId: theme, modeName: mode };
    this.baseService.changeTemplate();

    theme === 1
      ? ((this.blueThemeSelected = true),
        (this.orangeThemeSelected = false))
      : ((this.blueThemeSelected = false),
        (this.orangeThemeSelected = true));
    mode === 'light'
      ? ((this.lightModeSelected = true), (this.darkModeSelected = false))
      : ((this.lightModeSelected = false), (this.darkModeSelected = true));
  }
}

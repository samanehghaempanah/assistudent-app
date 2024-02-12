import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';
import { PwaService } from 'src/app/services/pwa.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.page.html',
  styleUrls: ['./download.page.scss'],
})
export class DownloadPage implements OnInit {

  constructor(
    public baseService: BaseService,
    public route: ActivatedRoute,
    public pwaService: PwaService) { }

  ngOnInit() { }

  public onInstallPWA() {
    this.pwaService.Install();
  }
}

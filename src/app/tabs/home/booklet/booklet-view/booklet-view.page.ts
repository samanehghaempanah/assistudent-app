import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BookletDataModel } from 'src/app/definitions/models/Entities.model';
import { BookletService } from 'src/app/services/Booklet.service';
import { BaseService } from 'src/app/services/base.service';
import { StorageService } from 'src/app/services/storage.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-booklet-view',
  templateUrl: './booklet-view.page.html',
  styleUrls: ['./booklet-view.page.scss'],
})
export class BookletViewPage implements OnInit {

  PageData = { Waiting: false, isClose: false, BookletId: 0, Item: new BookletDataModel() }

  constructor(
    public route: ActivatedRoute,
    public baseService: BaseService,
    public storageService: StorageService,
    public bookletService: BookletService,
    private sanitizer: DomSanitizer,
    private location: Location) {
    document.addEventListener('contextmenu', event => event.preventDefault());
  }
  public zoom = '50%';

  ngOnInit() {
    this.PageData.BookletId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadData();
  }

  async loadData() {
    this.PageData.Waiting = true;

    try {

      this.PageData.Item = await this.bookletService.UserBooklet_Loadfile(this.PageData.BookletId);
      this.PageData.Item.BookletFile = this.PageData.Item.BookletFile;

    } catch { }

    this.PageData.Waiting = false;
  }

  return() { this.location.back() }

  closeBar() {
    // this.PageData.isClose = !this.PageData.isClose;
  }
}


export class CustomToolbarComponent {
  public _theme = 'findbar';

  public showPdfViewer = true;

  public set theme(theme: string) {
    if (this._theme !== theme) {
      this.showPdfViewer = false;
      this._theme = theme;
      setTimeout(() => this.showPdfViewer = true, 100);
    } else {
      this._theme = theme;
    }
  }

  public get theme(): string {
    return this._theme;
  }
}
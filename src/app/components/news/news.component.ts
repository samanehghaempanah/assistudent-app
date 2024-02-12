import { Component, OnInit } from '@angular/core';
import { FilteringModel } from 'src/app/definitions/models/Common.model';
import { BaseService } from 'src/app/services/base.service';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'apv-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {

  PageData = {
    Waiting: false, Loaded: false,
    newsItems: [] as any
  }

  constructor(
    public baseService: BaseService,
    public newsService: NewsService
  ) { }

  ngOnInit() { this.loadData(); }

  async loadData() {

    this.PageData.Waiting = true;
    try {

      let filteringModel: FilteringModel = new FilteringModel();
      filteringModel.PageSize = 3;

      let result: any = await this.newsService.GET(filteringModel);

      if (result) { this.PageData.newsItems = result.Items; }

    } catch { }

    this.PageData.Waiting = false;
    this.PageData.Loaded = true;
  }
}

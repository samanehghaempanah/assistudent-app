import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilteringModel, ListResultModel, ScrollableTabModel } from 'src/app/definitions/models/Common.model';
import { BaseService } from 'src/app/services/base.service';
import { ScoreService } from 'src/app/services/score.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {

  PageData = {
    Waiting: false, Loaded: false, dropdownOpened: false, optionOpened: false,
    selectedTab: 'history',
    Categories: [] as ScrollableTabModel[],
    scoreHistory: [] as any,
    promotions: [] as any,
    guides: [] as any,
    questions: [] as any,
    listModel: new ListResultModel() as ListResultModel,
    filteringModel: new FilteringModel() as FilteringModel,
    openIndex: -1,
    total: 0 as number,
    completed: null as number,
    activeCard: false as boolean,
    progress: null as number
  }

  constructor(public baseService: BaseService,
    public scoreService: ScoreService,
    public storageService: StorageService,
    private router: Router,
    public route: ActivatedRoute
  ) { this.PageData.total = this.storageService.User.TotalScore; }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('selectedTab') != null) {
      this.PageData.selectedTab = this.route.snapshot.paramMap.get('selectedTab');
    }
  }

  ionViewWillEnter() {

    this.PageData.Categories = this.scoreService.Categories;

    this.loadData();
  }

  loadData(event: any = null) {
    this.PageData.Loaded = false;
    this.PageData.listModel.Items = [];

    if (this.PageData.selectedTab === 'history') {

      if (event) { this.PageData.filteringModel.PageNumber++; }
      else { this.PageData.filteringModel.PageNumber = 1; }

      this.scoreService.UserAction_GET(this.PageData.filteringModel).then((result: any) => {
        if (result) {

          // set Items
          if (result.Items) {
            // append next page items
            if (event) {
              this.PageData.listModel.CurrentPage = result.CurrentPage;
              this.PageData.listModel.HasNext = result.HasNext;
              this.PageData.listModel.HasPrevious = result.HasPrevious;
              this.PageData.listModel.TotalPages = result.TotalPages;
              this.PageData.listModel.TotalCount = result.TotalCount;
              result.Items.forEach((value: any) => { this.PageData.listModel.Items.push(value); });
            }
            // reload Items
            else { this.PageData.listModel = result; }
          }

          // set page filtering
          this.PageData.filteringModel.PageNumber = result.CurrentPage;
          this.PageData.filteringModel.PageSize = result.PageSize;
        }
      }).finally(() => { if (event != null) { event.target.complete(); } });
    }
    else if (this.PageData.selectedTab === 'get') {

      if (event) { this.PageData.filteringModel.PageNumber++; }
      else { this.PageData.filteringModel.PageNumber = 1; }

      this.scoreService.GET(this.PageData.filteringModel).then((result: any) => {
        if (result) {
          // set Items
          if (result.Items) {
            // append next page items
            if (event) {
              this.PageData.listModel.CurrentPage = result.CurrentPage;
              this.PageData.listModel.HasNext = result.HasNext;
              this.PageData.listModel.HasPrevious = result.HasPrevious;
              this.PageData.listModel.TotalPages = result.TotalPages;
              this.PageData.listModel.TotalCount = result.TotalCount;
              result.Items = result.Items.filter((item: any) => item.Score >= 0);
              result.Items.forEach((value: any) => { this.PageData.listModel.Items.push(value); });
            }
            // reload Items
            else {
              result.Items = result.Items.filter((item: any) => item.Score >= 0);
              this.PageData.listModel = result;
            }
          }

          // set page filtering
          this.PageData.filteringModel.PageNumber = result.CurrentPage;
          this.PageData.filteringModel.PageSize = result.PageSize;
        }
      }).finally(() => { if (event != null) { event.target.complete(); } });
    }
    else if (this.PageData.selectedTab === 'use') {
      if (event) { this.PageData.filteringModel.PageNumber++; }
      else { this.PageData.filteringModel.PageNumber = 1; }

      this.scoreService.GET(this.PageData.filteringModel).then((result: any) => {
        if (result) {

          // set Items
          if (result.Items) {
            // append next page items
            if (event) {
              this.PageData.listModel.CurrentPage = result.CurrentPage;
              this.PageData.listModel.HasNext = result.HasNext;
              this.PageData.listModel.HasPrevious = result.HasPrevious;
              this.PageData.listModel.TotalPages = result.TotalPages;
              this.PageData.listModel.TotalCount = result.TotalCount;
              result.Items = result.Items.filter((item: any) => item.Score < 0);
              result.Items.forEach((value: any) => { this.PageData.listModel.Items.push(value); });
            }
            // reload Items
            else {
              result.Items = result.Items.filter((item: any) => item.Score < 0);
              this.PageData.listModel = result;
            }
          }

          // set page filtering
          this.PageData.filteringModel.PageNumber = result.CurrentPage;
          this.PageData.filteringModel.PageSize = result.PageSize;
        }
      }).finally(() => { if (event != null) { event.target.complete(); } });
    }
    else if (this.PageData.selectedTab === 'faq') {

      this.scoreService.Question_GET().then((result: any) => {

        if (result) { this.PageData.questions = result.Items; }

      });
    }
    else if (this.PageData.selectedTab === 'promotion') {

      this.scoreService.Promotion_GET().then((result: any) => {
        if (result) {
          this.PageData.promotions = result.Items;

          this.PageData.promotions.forEach((promotion: any) => {
            this.PageData.completed = promotion.Score;
            // console.log('completed', this.PageData.completed);


            if (this.PageData.total >= this.PageData.completed) {
              this.PageData.progress = 100;
              this.PageData.activeCard = true;
              // console.log('progress', this.PageData.progress);
              // console.log(this.PageData.activeCard);
            } else {
              this.PageData.progress = (this.PageData.total / this.PageData.completed) * 100;
              // console.log('progress', this.PageData.progress);
              // console.log(this.PageData.activeCard);
            }
          });
        }
      });
    }

    this.PageData.Loaded = true;
  }

  onGetPromotion(promotion: any) {
    this.baseService
      .confirm(
        this.baseService.translate('common-alert-user'),
        this.baseService.translate('score-alert-promotion-get'),
        this.baseService.translate('common-btn-logout-yes'),
        this.baseService.translate('common-btn-logout-no')
      )
      .then((confirmResult: any) => {
        if (confirmResult) { }
      });
  }

  // first dropdown
  openDropdown() { this.PageData.dropdownOpened = !this.PageData.dropdownOpened; }

  // another dropdown
  openOption() { this.PageData.optionOpened = !this.PageData.optionOpened; }

  onTabClick(event: any) {

    this.PageData.selectedTab = event.value;

    this.loadData();
  }

  accordionGroupChange(e: any) { this.PageData.openIndex = e.detail.value; }
}

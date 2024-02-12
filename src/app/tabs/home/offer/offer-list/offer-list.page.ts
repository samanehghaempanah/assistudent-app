import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FilteringModel,
  ListResultModel,
  ScrollableTabModel,
} from 'src/app/definitions/models/Common.model';
import { filteringOperationType } from 'src/app/definitions/models/DataTypes.model';
import { BaseService } from 'src/app/services/base.service';
import { OfferService } from 'src/app/services/offer.service';
import { ThirdPartyService } from 'src/app/services/third-party.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.page.html',
  styleUrls: ['./offer-list.page.scss'],
})
export class OfferListPage implements OnInit {

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public baseService: BaseService,
    public offerService: OfferService,
    public thirdPartyService: ThirdPartyService
  ) {}

  Categories: ScrollableTabModel[] = [];
  selectedTab: any = 'list';
  search: any;
  listResultModel: ListResultModel = new ListResultModel();
  filteringModel: FilteringModel = new FilteringModel();
  filerBoxOpened = false;
  advanceSearchEnable = false;

  sliderOpts = {
    initialSlide: 1,
    speed: 600,
    autoplay: true,
    slidesPerView: 1,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  };

  ngOnInit() {
    this.loadOffersData();
  }

  ionViewWillEnter() {
    this.Categories = this.offerService.Categories;
    this.search.setFocus();
  }

  loadOffersData(event: any = null) {
    if (event) {
      this.filteringModel.PageNumber++;
    } else {
      this.filteringModel.PageNumber = 1;
    }
    this.offerService
      .GET(this.filteringModel)
      .then((result: any) => {
        if (result) {
          if (result.Items) {
            if (event) {
              this.listResultModel.CurrentPage = result.CurrentPage;
              this.listResultModel.HasNext = result.HasNext;
              this.listResultModel.HasPrevious = result.HasPrevious;
              this.listResultModel.TotalPages = result.TotalPages;
              this.listResultModel.TotalCount = result.TotalCount;
              result.Items.forEach((value: any) => {
                this.listResultModel.Items.push(value);
              });
            } else {
              this.listResultModel = result;
            }
          }
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

  loadThirdPartiesData(event: any = null) {
    if (event) {
      this.filteringModel.PageNumber++;
    } else {
      this.filteringModel.PageNumber = 1;
    }
    this.thirdPartyService
      .GET(this.filteringModel)
      .then((result: any) => {
        if (result) {
          if (result.Items) {
            if (event) {
              this.listResultModel.CurrentPage = result.CurrentPage;
              this.listResultModel.HasNext = result.HasNext;
              this.listResultModel.HasPrevious = result.HasPrevious;
              this.listResultModel.TotalPages = result.TotalPages;
              this.listResultModel.TotalCount = result.TotalCount;
              result.Items.forEach((value: any) => {
                this.listResultModel.Items.push(value);
              });
            } else {
              this.listResultModel = result;
            }
          }
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

  loadHistoriesData(event: any = null) {
    if (event) {
      this.filteringModel.PageNumber++;
    } else {
      this.filteringModel.PageNumber = 1;
    }
    this.offerService
      .History(this.filteringModel)
      .then((result: any) => {
        if (result) {
          if (result.Items) {
            if (event) {
              this.listResultModel.CurrentPage = result.CurrentPage;
              this.listResultModel.HasNext = result.HasNext;
              this.listResultModel.HasPrevious = result.HasPrevious;
              this.listResultModel.TotalPages = result.TotalPages;
              this.listResultModel.TotalCount = result.TotalCount;
              result.Items.forEach((value: any) => {
                this.listResultModel.Items.push(value);
              });
            } else {
              this.listResultModel = result;
            }
          }
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

  onTabClick(event: any) {
    this.selectedTab = event.value;
    switch (this.selectedTab) {
      case 'list':
        this.loadOffersData();
        break;
      case 'company':
        this.loadThirdPartiesData();
        break;
      case 'history':
        this.loadHistoriesData();
        break;
      default:
        this.loadOffersData();
    }
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
    switch (this.selectedTab) {
      case 'list':
        this.loadOffersData();
        break;
      case 'company':
        this.loadThirdPartiesData();
        break;
      case 'history':
        this.loadHistoriesData();
        break;
    }
  }

  openFilterBox() {
    this.filerBoxOpened = !this.filerBoxOpened;
  }

  advanceSearch() {
    this.advanceSearchEnable = true;
  }
}

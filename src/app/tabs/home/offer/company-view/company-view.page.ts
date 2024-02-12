import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FilteringModel, ListResultModel } from 'src/app/definitions/models/Common.model';
import { filteringOperationType } from 'src/app/definitions/models/DataTypes.model';
import { BaseService } from 'src/app/services/base.service';
import { OfferService } from 'src/app/services/offer.service';
import { ThirdPartyService } from 'src/app/services/third-party.service';

@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.page.html',
  styleUrls: ['./company-view.page.scss'],
})
export class CompanyViewPage implements OnInit {
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private location:Location,
    public baseService: BaseService,
    public offerService: OfferService,
    public thirdPartyService: ThirdPartyService
  ) {}

  thirdPartyId: any;
  thirdPartyDetails: any;
  listResultModel: ListResultModel = new ListResultModel();
  filteringModel: FilteringModel = new FilteringModel();

  sliderOpts = {
    initialSlide: 2.5,
    speed: 600,
    autoplay: true,
    slidesPerView: 2.5,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  };

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.thirdPartyId = params.get('id');
    });
    this.loadData(this.thirdPartyId);
    this.loadOffersData();
  }

  loadData(thirdPartyId: any) {
    this.thirdPartyService.Get(thirdPartyId).then((res: any) => {
      this.thirdPartyDetails = res;
    });
  }

  loadOffersData(event: any = null) {
    if (event) {
      this.filteringModel.PageNumber++;
    } else {
      this.filteringModel.PageNumber = 1;
    }
    this.filteringModel.AddCondition("Thirdparty_Id", this.thirdPartyId, filteringOperationType.Equal);
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
      })
      .finally(() => {
        if (event != null) {
          event.target.complete();
        }
      });
  }

  backLocation() {
    this.location.back()
  }
}

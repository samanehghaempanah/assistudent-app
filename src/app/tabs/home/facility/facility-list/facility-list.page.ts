import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../../../../services/base.service';
import { FacilitiesService } from '../../../../services/facilities.service';
import { ScrollableTabModel ,FilteringModel, ListResultModel } from '../../../../definitions/models/Common.model'
import { filteringOperationType } from '../../../../definitions/models/DataTypes.model';




@Component({
  selector: 'app-facility-list',
  templateUrl: './facility-list.page.html',
  styleUrls: ['./facility-list.page.scss'],
})
export class FacilityListPage implements OnInit {
  FacilitiesItems: any[] = [];
  UserFacilitiesItems: any[] = [];
  FacilitiesHistoryItems: any[] = [];
  Categories: ScrollableTabModel[] = [];
  selectedTab: any = 'list';
  selectedTabForNew: any = null;
  NewCategories: any[] = [];
  listModel: ListResultModel = new ListResultModel();
  filteringModel: FilteringModel = new FilteringModel();

  constructor(
    public baseService: BaseService,
    public facilitiesService: FacilitiesService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ionViewWillEnter() {
    this.Categories = this.facilitiesService.Categories;
    this.NewCategories = this.facilitiesService.NewCategories;
  }

  onTabClick(event: any) {
    this.selectedTab = event.value;
  }

  onTabClickForNewFacilities(event: any) {
    if (event.value === '0') {
      this.filteringModel.RemoveCondition("Categoty_Id");
    }
    else {
      this.filteringModel.AddCondition("Categoty_Id", event.value, filteringOperationType.Equal);
    }
    this.loadFacilitysList();
    this.loadFacilitiesHistoryList();
  }


  ngOnInit() {
    if (this.route.snapshot.paramMap.get('selectedTab') != null) {
      this.selectedTab = this.route.snapshot.paramMap.get('selectedTab');
    }
    this.loadFacilitysList();
    this.loadUserFacilitysList();
    this.loadFacilitiesHistoryList();
  }
  onClick(clickTab: any) {
    this.selectedTab = clickTab;
  }

  loadFacilitysList() {
    this.facilitiesService.FacilitysList().then((result: any) => {
      if (result) {
        this.FacilitiesItems = result.Items;
      }
    });
  }

  loadUserFacilitysList() {
    this.facilitiesService.UserFacilitysList().then((result: any) => {
      if (result) {
        this.UserFacilitiesItems = result.items;
      }
    });
  }

  loadFacilitiesHistoryList() {
    this.facilitiesService.FacilitiesHistoryList().then((result:any)=> {
      if (result) {
        this.FacilitiesHistoryItems = result.Items
      }
    })
  }

  goToVeiw(facility: any) {
    this.router.navigate(['../facility/view', facility.id]);
  }
}

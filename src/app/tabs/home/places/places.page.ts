import { Component, OnInit } from '@angular/core';
import { FilteringModel, ListResultModel, ScrollableTabModel } from '../../../definitions/models/Common.model';
import { filteringOperationType } from 'src/app/definitions/models/DataTypes.model';
import { BaseService } from 'src/app/services/base.service';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
})
export class PlacesPage implements OnInit {
  Categories: ScrollableTabModel[] = [];
  selectedTab: any = 0;
  search: any;
  listModel: ListResultModel = new ListResultModel();
  filteringModel: FilteringModel = new FilteringModel();

  constructor(
    public placeService: PlaceService,
    public baseService: BaseService
  ) { }

  ngOnInit() {
    this.loadData();
    this.loadCategories();
  }

  loadData(event: any = null) {

    // next page or reload Items
    if (event) { this.filteringModel.PageNumber++; }
    else { this.filteringModel.PageNumber = 1; }

    this.placeService.GET(this.filteringModel).then((result: any) => {
      if (result) {

        // set Items
        if (result.Items) {
          // append next page items
          if (event) {
            this.listModel.CurrentPage = result.CurrentPage;
            this.listModel.HasNext = result.HasNext;
            this.listModel.HasPrevious = result.HasPrevious;
            this.listModel.TotalPages = result.TotalPages;
            this.listModel.TotalCount = result.TotalCount;
            result.Items.forEach((value: any) => { this.listModel.Items.push(value); });
          }
          // reload Items
          else { this.listModel = result; }
        }

        // set page filtering
        this.filteringModel.PageNumber = result.CurrentPage;
        this.filteringModel.PageSize = result.PageSize;
      }
      this.search.setFocus();
    }).finally(() => { if (event != null) { event.target.complete(); } });
  }

  loadCategories() {
    this.placeService.PlaceType_GET(this.filteringModel).then((result: any) => {
      if (result?.Items) {

        let tempCategories: ScrollableTabModel[] = [];

        tempCategories.push({ title: this.baseService.translate('common-scrollabletab-allitems'), actionUrl: '', value: 0 });

        result.Items.forEach((element: any) => {
          tempCategories.push({ title: element.Title, actionUrl: '', value: element.Id });
        });

        this.Categories = tempCategories;
      }

    });

  }

  onTabClick(event: any) {
    if (event.value === 0) {
      this.filteringModel.RemoveCondition("PlaceType_Id");
    }
    else {
      this.filteringModel.AddCondition("PlaceType_Id", event.value, filteringOperationType.Equal);
    }
    this.loadData();
  }

  onSearchClick(event: any) {
    if (!event || event.detail.value.trim().length == 0) {
      this.filteringModel.RemoveCondition("Title");
    }
    else {
      this.filteringModel.AddCondition("Title", event.detail.value.trim(), filteringOperationType.Contain);
    }
    this.search = event.srcElement;
    this.loadData();
  }

  onMap(item: any) {
    let mapUrl = 'https://maps.google.com/' + '?' + 'q' + '=' + item.Latitude + ',' + item.Longitude;
    window.open(mapUrl, '_system');
  }
}

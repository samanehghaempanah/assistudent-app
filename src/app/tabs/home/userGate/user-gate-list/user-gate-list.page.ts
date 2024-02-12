import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FilteringModel, ListResultModel } from 'src/app/definitions/models/Common.model';
import { filteringOperationType } from 'src/app/definitions/models/DataTypes.model';
import { BaseService } from 'src/app/services/base.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserGateService } from 'src/app/services/user-gate.service';

@Component({
  selector: 'app-user-gate-list',
  templateUrl: './user-gate-list.page.html',
  styleUrls: ['./user-gate-list.page.scss'],
})
export class UserGateListPage implements OnInit {

  search: any;
  listModel: ListResultModel = new ListResultModel();
  filteringModel: FilteringModel = new FilteringModel();

  constructor(
    public baseService: BaseService,
    public navCtrl: NavController,
    public storageService: StorageService,
    public userGateService: UserGateService
  ) { }

  ngOnInit() { this.loadData(); }

  loadData(event: any = null) {

    // next page or reload Items
    if (event) { this.filteringModel.PageNumber++; }
    else { this.filteringModel.PageNumber = 1; }

    this.userGateService.GET(this.filteringModel).then((result: any) => {
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
      if (this.search) { this.search.setFocus(); }
    }).finally(() => { if (event != null) { event.target.complete(); } });
  }

  onSearchClick(event: any) {
    if (!event || event.detail.value.trim().length == 0) {
      this.filteringModel.SearchValue = '';
    }
    else {
      this.filteringModel.SearchValue = event.detail.value.trim();
      this.search = event.srcElement;
    }
    this.loadData();
  }
}

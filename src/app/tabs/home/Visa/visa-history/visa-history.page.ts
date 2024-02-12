import { Component, OnInit } from '@angular/core';
import { FilteringModel, ListResultModel } from 'src/app/definitions/models/Common.model';
import { FormStatus } from 'src/app/definitions/models/DataTypes.model';
import { BaseService } from 'src/app/services/base.service';
import { VisaService } from 'src/app/services/visa.service';

@Component({
  selector: 'app-visa-history',
  templateUrl: './visa-history.page.html',
  styleUrls: ['./visa-history.page.scss'],
})

export class VisaHistoryPage implements OnInit {
  listModel: ListResultModel = new ListResultModel();
  filteringModel: FilteringModel = new FilteringModel();
  FormStatus = FormStatus;

  constructor(
    public baseService: BaseService,
    public visaService: VisaService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData(event: any = null) {
    if (event) {
      this.filteringModel.PageNumber++;
    } else {
      this.filteringModel.PageNumber = 1;
    }
    this.visaService
      .History(this.filteringModel)
      .then((result: any) => {
        if (result) {
          if (result.Items) {
            if (event) {
              this.listModel.CurrentPage = result.CurrentPage;
              this.listModel.HasNext = result.HasNext;
              this.listModel.HasPrevious = result.HasPrevious;
              this.listModel.TotalPages = result.TotalPages;
              this.listModel.TotalCount = result.TotalCount;
              result.Items.forEach((value: any) => {
                this.listModel.Items.push(value);
              });
            } else {
              this.listModel = result;
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
}

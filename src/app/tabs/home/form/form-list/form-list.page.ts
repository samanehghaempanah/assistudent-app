import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilteringModel, ListResultModel, ScrollableTabModel } from 'src/app/definitions/models/Common.model';
import { FormStatus, FormType, PaymentStatus, filteringOperationType } from 'src/app/definitions/models/DataTypes.model';
import { BaseService } from 'src/app/services/base.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.page.html',
  styleUrls: ['./form-list.page.scss'],
})
export class FormListPage implements OnInit {
  Categories: ScrollableTabModel[] = [];
  selectedTab: any = 'list' as 'list' | 'history';
  FormStatus = FormStatus;
  PaymentStatus = PaymentStatus;
  formType: number = 0;
  FormType = FormType;
  userFormId: number = 0;
  isHistoryUrl = false;

  listModel: ListResultModel = new ListResultModel();
  filteringModel: FilteringModel = new FilteringModel();

  constructor(
    public route: ActivatedRoute,
    public baseService: BaseService,
    public formService: FormService,
  ) { }

  ngOnInit() {
    // this.formType = Number(this.route.snapshot.paramMap.get('formType'));
    this.userFormId = Number(this.route.snapshot.paramMap.get('userFormId'));
    this.isHistoryUrl = (this.route.snapshot.paramMap.get('selectedTab') === 'history');

    if (this.isHistoryUrl) { this.selectedTab = 'history'; }
  }

  ionViewWillEnter() {
    this.Categories = this.formService.Categories;

    this.loadData();
  }

  loadData(event: any = null) {
    if (this.selectedTab === 'list') {
      if (event) { this.filteringModel.PageNumber++; }
      else { this.filteringModel.PageNumber = 1; }
      // if (this.formType === 0) {
      this.filteringModel.AddCondition("FormType", FormType.Offer, filteringOperationType.NotEqual);
      // } else {
      //   this.filteringModel.RemoveCondition("FormType");
      // }      
      this.formService.GET(this.filteringModel).then((result: any) => {
        if (result) {
          if (result.Items) {
            if (event) {
              this.listModel.CurrentPage = result.CurrentPage;
              this.listModel.HasNext = result.HasNext;
              this.listModel.HasPrevious = result.HasPrevious;
              this.listModel.TotalPages = result.TotalPages;
              this.listModel.TotalCount = result.TotalCount;
              result.Items.forEach((value: any) => { this.listModel.Items.push(value); });
            }
            else {
              this.listModel = result;
            }
          }
          this.filteringModel.PageNumber = result.CurrentPage;
          this.filteringModel.PageSize = result.PageSize;
        }
      }).finally(() => { if (event != null) { event.target.complete(); } });
    }
    else if (this.selectedTab === 'history') {
      if (event) { this.filteringModel.PageNumber++; }
      else { this.filteringModel.PageNumber = 1; }
      if (this.isHistoryUrl && this.userFormId > 0) {
        this.filteringModel.AddCondition("UserForm_Id", this.userFormId, filteringOperationType.Equal);
      } else {
        this.filteringModel.RemoveCondition("UserForm_Id");
      }
      this.formService.UserForm(this.filteringModel).then((result: any) => {
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

  onTabClick(event: any) {
    this.selectedTab = event.value;
    this.loadData();
  }
}
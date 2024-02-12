import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ChartComponent } from 'ng-apexcharts';
import { FilteringModel, ListResultModel } from 'src/app/definitions/models/Common.model';
import { FieldType, RoleCode, filteringOrderType } from 'src/app/definitions/models/DataTypes.model';
import { BookletDataModel, UserBookletDataModel } from 'src/app/definitions/models/Entities.model';
import { UploadResponseChangeEvent } from 'src/app/definitions/models/upload.model';
import { jDatePipe } from 'src/app/definitions/pipes/jdate.pipe';
import { BookletService } from 'src/app/services/Booklet.service';
import { BaseService } from 'src/app/services/base.service';
import { CoreService } from 'src/app/services/core.service';
import { StorageService } from 'src/app/services/storage.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  colors: any[];
};

@Component({
  selector: 'app-booklet-list',
  templateUrl: './booklet-list.page.html',
  styleUrls: ['./booklet-list.page.scss'],
  providers: [jDatePipe]
})

export class BookletListPage implements OnInit {
  @ViewChild("chart", { static: false }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  Categories: any[] = [];
  MyBookletCategories: any[] = [];
  selectedTab: any = 'allItem';
  MyBookletselectedTab: any = 'bought';

  PageData = {
    Waiting: false,
    isTeacher: false,
    search: null as any, advanceSearchEnable: false,
    showBookletDetails: false, showUserBookletDetails: false, showSaleStatus: false, showHeadlines: false, showNewBookletForm: false, showEditBookletForm: false,
    FieldType: FieldType,
    formGroup: FormGroup,
    myControl: new FormControl(''),
    listModel: new ListResultModel() as ListResultModel,
    filteringModel: new FilteringModel() as FilteringModel,
    majorListModel: new ListResultModel() as ListResultModel,
    majorFilteringModel: new FilteringModel() as FilteringModel,
    searchComponent: null as any,
    bookletDetails: new BookletDataModel() as BookletDataModel,
    userBookletDetails: new UserBookletDataModel() as UserBookletDataModel,
    entityModel: new BookletDataModel() as BookletDataModel,
    SaleStatus: [] as any,
    isNonIranian: false,
    window: 'desktop' as 'desktop' | 'mobile' | 'tablet',
  }

  constructor(
    private router: Router,
    public coreService: CoreService,
    public baseService: BaseService,
    public storageService: StorageService,
    public bookletService: BookletService,
    private jDate: jDatePipe) {

    this.chartOptions = {
      series: [
        {
          name: "",
          data: []
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        offsetY: 25
      },
      colors: ['#0014CB', '#0FC000']
    };
  }

  ngOnInit() {
    this.checkWindow();
    this.storageService.User.Roles.forEach((el: any) => {
      switch (el.Role_Code) {
        case RoleCode.Teacher:
          this.PageData.isTeacher = true;
          this.MyBookletCategories = this.bookletService.MyBookletCategories;
          this.Categories = [{
            value: 'allItem',
            title: this.baseService.translate('Booklet-list-tabs-allItem'),
            actionUrl: '',
          },
          {
            value: 'myBooklet',
            title: this.baseService.translate('Booklet-list-tabs-myBooklet'),
            actionUrl: '',
          },
          {
            value: 'newBooklet',
            title: this.baseService.translate('Booklet-list-tabs-teacherpage-newBooklet'),
            actionUrl: '',
          }
          ];
          break;
        case RoleCode.StudentFarsi || RoleCode.StudentEnglish || RoleCode.StudentArabic || RoleCode.StudentAfghan:
          this.Categories = [
            {
              value: 'allItem',
              title: this.baseService.translate('Booklet-list-tabs-allItem'),
              actionUrl: '',
            },
            {
              value: 'myBooklet',
              title: this.baseService.translate('Booklet-list-tabs-myBooklet'),
              actionUrl: '',
            }
          ]
          break;
      }
      this.loadData();
      this.loadMajors();
    });

    if (this.baseService.authenticated) {
      this.storageService.User.Roles.forEach((el: any) => {
        if (el.Role_Code === RoleCode.StudentEnglish || el.Role_Code === RoleCode.StudentArabic || el.Role_Code === RoleCode.StudentAfghan) {
          this.PageData.isNonIranian = true;
        }
      });
    }
  }

  async loadData(event: any = null) {
    this.PageData.showBookletDetails = false;
    this.PageData.showHeadlines = false;
    try {
      switch (this.selectedTab) {
        case 'allItem':
          if (event) { this.PageData.filteringModel.PageNumber++; }
          else { this.PageData.filteringModel.PageNumber = 1; }
          let result = await this.bookletService.GET(this.PageData.filteringModel);
          if (result) {
            if (result.Items) {
              if (event) {
                this.PageData.listModel.CurrentPage = result.CurrentPage;
                this.PageData.listModel.HasNext = result.HasNext;
                this.PageData.listModel.HasPrevious = result.HasPrevious;
                this.PageData.listModel.TotalPages = result.TotalPages;
                this.PageData.listModel.TotalCount = result.TotalCount;
                result.Items.forEach((value: any) => {
                  this.PageData.listModel.Items.push(value);
                });
              } else {
                this.PageData.listModel = result;
              }
            }
            this.PageData.filteringModel.PageNumber = result.CurrentPage;
            this.PageData.filteringModel.PageSize = result.PageSize;
          }
          if (event != null) { event.target.complete(); }
          break;

        case 'myBooklet':
          if (!this.PageData.isTeacher) {
            if (event) { this.PageData.filteringModel.PageNumber++; }
            else { this.PageData.filteringModel.PageNumber = 1; }
            let myBookletResult = await this.bookletService.UserBooklet_GET();
            if (myBookletResult) {
              if (myBookletResult.Items) {
                if (event) {
                  this.PageData.listModel.CurrentPage = myBookletResult.CurrentPage;
                  this.PageData.listModel.HasNext = myBookletResult.HasNext;
                  this.PageData.listModel.HasPrevious = myBookletResult.HasPrevious;
                  this.PageData.listModel.TotalPages = myBookletResult.TotalPages;
                  this.PageData.listModel.TotalCount = myBookletResult.TotalCount;
                  myBookletResult.Items.forEach((value: any) => {
                    this.PageData.listModel.Items.push(value);
                  });
                } else {
                  this.PageData.listModel = myBookletResult;
                }
              }
              this.PageData.filteringModel.PageNumber = myBookletResult.CurrentPage;
              this.PageData.filteringModel.PageSize = myBookletResult.PageSize;
            }
            if (event != null) { event.target.complete(); }
          }

          else {
            switch (this.MyBookletselectedTab) {
              case 'bought':
                if (event) { this.PageData.filteringModel.PageNumber++; }
                else { this.PageData.filteringModel.PageNumber = 1; }
                let myBookletResult = await this.bookletService.UserBooklet_GET(this.PageData.filteringModel);
                if (myBookletResult) {
                  if (myBookletResult.Items) {
                    if (event) {
                      this.PageData.listModel.CurrentPage = myBookletResult.CurrentPage;
                      this.PageData.listModel.HasNext = myBookletResult.HasNext;
                      this.PageData.listModel.HasPrevious = myBookletResult.HasPrevious;
                      this.PageData.listModel.TotalPages = myBookletResult.TotalPages;
                      this.PageData.listModel.TotalCount = myBookletResult.TotalCount;
                      myBookletResult.Items.forEach((value: any) => {
                        this.PageData.listModel.Items.push(value);
                      });
                    } else {
                      this.PageData.listModel = myBookletResult;
                    }
                  }
                  this.PageData.filteringModel.PageNumber = myBookletResult.CurrentPage;
                  this.PageData.filteringModel.PageSize = myBookletResult.PageSize;
                }
                if (event != null) { event.target.complete(); }
                break;

              case 'uploaded':
                if (event) { this.PageData.filteringModel.PageNumber++; }
                else { this.PageData.filteringModel.PageNumber = 1; }
                let myUploadedResult = await this.bookletService.Mine_GET(this.PageData.filteringModel);
                if (myUploadedResult) {
                  if (myUploadedResult.Items) {
                    if (event) {
                      this.PageData.listModel.CurrentPage = myUploadedResult.CurrentPage;
                      this.PageData.listModel.HasNext = myUploadedResult.HasNext;
                      this.PageData.listModel.HasPrevious = myUploadedResult.HasPrevious;
                      this.PageData.listModel.TotalPages = myUploadedResult.TotalPages;
                      this.PageData.listModel.TotalCount = myUploadedResult.TotalCount;
                      myUploadedResult.Items.forEach((value: any) => {
                        this.PageData.listModel.Items.push(value);
                      });
                    } else {
                      this.PageData.listModel = myUploadedResult;
                    }
                  }
                  this.PageData.filteringModel.PageNumber = myUploadedResult.CurrentPage;
                  this.PageData.filteringModel.PageSize = myUploadedResult.PageSize;
                }
                if (event != null) { event.target.complete(); }
                break;
            }
          }
          break;

        case 'newBooklet':
          this.PageData.showNewBookletForm = true;
          break;
      }
      this.PageData.search.setFocus();
    } catch { }
  }

  async loadMajors(event: any = null) {
    if (event) { this.PageData.majorFilteringModel.PageNumber++; }
    else { this.PageData.majorFilteringModel.PageNumber = 1; }
    if (this.PageData.searchComponent && !event) { this.PageData.majorListModel = null; }
    let result = await this.coreService.Major_GET(this.PageData.majorFilteringModel);

    if (result) {

      // set Items
      if (result.Items) {
        // append next page items
        if (event) {
          this.PageData.majorListModel.CurrentPage = result.CurrentPage;
          this.PageData.majorListModel.HasNext = result.HasNext;
          this.PageData.majorListModel.HasPrevious = result.HasPrevious;
          this.PageData.majorListModel.TotalPages = result.TotalPages;
          this.PageData.majorListModel.TotalCount = result.TotalCount;
          result.Items.forEach((value: any) => { this.PageData.majorListModel.Items.push(value); });
        }
        // reload Items
        else { this.PageData.majorListModel = result; }
      }

      // set page filtering
      this.PageData.majorFilteringModel.PageNumber = result.CurrentPage;
      this.PageData.majorFilteringModel.PageSize = result.PageSize;

    }
    if (this.PageData.searchComponent) { this.PageData.searchComponent.setFocus(); }
  }

  // Searchbar Methods

  onSearchClick(event: any) {
    if (!event || event.detail.value.trim().length == 0) {
      this.PageData.filteringModel.SearchValue = '';
    } else {
      this.PageData.filteringModel.SearchValue = event.detail.value.trim();
      this.PageData.search = event.srcElement;
    }
    this.loadData();
    this.PageData.search = event.srcElement;
  }

  // ScrollableTab Methods

  onTabClick(event: any) {
    this.selectedTab = event.value;
    this.loadData();
  }

  onMyBookletTabClick(event: any) {
    this.MyBookletselectedTab = event.value;
    this.loadData();
  }

  // FilterBox Methods

  onFilterBox(e: any) {
    switch (e.detail.value) {
      case 'newest':
        this.PageData.filteringModel.AddOrder('CreateionDate', filteringOrderType.Ascending)
        break;
      case 'bestselling':
        this.PageData.filteringModel.AddOrder('SaleCount', filteringOrderType.Ascending)
        break;
      case 'expensive':
        this.PageData.filteringModel.AddOrder('Price', filteringOrderType.Descending)
        break;
      case 'cheapest':
        this.PageData.filteringModel.AddOrder('Price', filteringOrderType.Ascending)
        break;

      default:
        break;
    }
    this.loadData();
  }

  advanceSearch() {
    this.PageData.advanceSearchEnable = true;
  }

  // SelectBox Component Methods

  onSearchingSelect(event: any) {
    if (typeof (event) === 'string') {
      if (event.trim().length === 0) { this.PageData.majorFilteringModel.SearchValue = ''; }
      else {
        this.PageData.majorFilteringModel.SearchValue = event.trim();
        this.PageData.searchComponent = event.trim();
      }
    }
    else {
      if (!event || event.Title.trim().length === 0) { this.PageData.majorFilteringModel.SearchValue = ''; }
      else {
        this.PageData.majorFilteringModel.SearchValue = event.Title.trim();
        this.PageData.searchComponent = event.trim();
      }
    }
  }

  selectedMajor(event: any) {
    console.log("this.PageData.entityModel", this.PageData.entityModel);

    let addedMajor = this.PageData.entityModel.Majors.findIndex(e => e.Major_Id === event.Id);
    if (addedMajor === -1) {
      this.PageData.entityModel.Majors.push(JSON.parse(JSON.stringify({ Id: 0, Major_Id: event.Id, Major_Title: event.Title })));

    }
    this.onSearchingSelect('');
  }

  removeSelectedMajor(selectedMajor: any) {
    this.PageData.entityModel.Majors = this.PageData.entityModel.Majors.filter(e => e.Major_Id != selectedMajor.Major_Id);
  }

  // BookletDetails Methods

  async showUserBookletDetails(booklet: any) {
    this.PageData.userBookletDetails = new UserBookletDataModel();
    this.PageData.SaleStatus = [];
    this.PageData.showUserBookletDetails = true;
    this.PageData.showBookletDetails = false;
    this.PageData.showSaleStatus = false;
    this.PageData.Waiting = true;
    try {

      let result: any = await this.bookletService.UserBooklet_Get(booklet.Id);

      if (result) {
        this.PageData.userBookletDetails = result;
      }
    } catch { }
    this.PageData.Waiting = false;
  }

  async showBookletDetails(booklet: any) {
    this.PageData.bookletDetails = new BookletDataModel();
    this.PageData.SaleStatus = [];
    this.PageData.showBookletDetails = true;
    this.PageData.showUserBookletDetails = false;
    this.PageData.showSaleStatus = false;
    this.PageData.Waiting = true;
    try {
      let result: any = await this.bookletService.Get(booklet.Id);

      if (result) {
        this.PageData.bookletDetails = result;
      }
    } catch { }
    this.PageData.Waiting = false;
  }

  // For Chart Of Sale Status
  combineDuplicateXValues(data: any[]): any[] {
    const combinedData = [];

    for (const dataPoint of data) {
      const xValue = dataPoint.x;
      const yValue = dataPoint.y;

      let existingDataPoint = combinedData.find(dataPoint => dataPoint.x === xValue);

      if (existingDataPoint) {
        existingDataPoint.y += yValue;
      } else {
        combinedData.push({
          x: xValue,
          y: yValue
        });
      }
    }

    return combinedData;
  }

  async openSaleStatus() {
    this.PageData.showSaleStatus = !this.PageData.showSaleStatus;
    this.PageData.Waiting = true;
    if (this.chartOptions.series[0].data) { this.chartOptions.series[0].data = []; }

    try {
      let result: any = await this.bookletService.Sold_Get(this.PageData.bookletDetails.Id);

      if (result) {
        this.PageData.SaleStatus = result;

        this.PageData.SaleStatus.TotalSold = result.TotalCount * this.PageData.bookletDetails.Price;

        let Data: any[] = [];

        result.Items.forEach((item: any) => {
          item.CreateDate = this.jDate.transform(item.CreateDate, 'date');

          let data: any;
          data = { x: item.CreateDate, y: item.BookletPrice };

          Data.push(data);

        });

        if (Data) {
          const combinedData = this.combineDuplicateXValues(Data);

          this.chartOptions.series = [{
            name: this.PageData.bookletDetails.Title,
            data: combinedData
          }]
        }

      }

    } catch { }
    this.PageData.Waiting = false;
  }

  // For Chart Of Sale Status


  openHeadlines() {
    this.PageData.showHeadlines = true;
  }

  openBooklet(booklet: any) {
    this.router.navigate(['./home/booklet/', booklet.Id]);
  }

  // Delete Booklet Methods

  async onDeleteBooklet(bookletDetails: any) {
    try {
      let result: any = await this.bookletService.DELETE(bookletDetails.Id);

      if (result) {
        this.PageData.showBookletDetails = false;
        this.loadData();
      }
    } catch { }
  }

  // Edit Booklet Methods

  onEditBooklet(booklet: any) {
    this.PageData.showEditBookletForm = true;
    this.PageData.entityModel = booklet;
  }

  async submitEditBooklet() {

    console.log("this.PageData.entityModel", this.PageData.entityModel);

    this.PageData.Waiting = true;

    try {
      let result: any = await this.bookletService.PUT(this.PageData.entityModel.Id, this.PageData.entityModel);

      if (result) {
        this.baseService.toast(this.baseService.translate('common-error-success'), 'success');
        this.PageData.showEditBookletForm = false;
      }
    } catch { }

    this.PageData.Waiting = false;
  }

  // New Booklet Methods

  async submitNewBooklet() {

    console.log("this.PageData.entityModel", this.PageData.entityModel);

    this.PageData.Waiting = true;

    try {
      let result: any = await this.bookletService.POST(this.PageData.entityModel);

      if (result) {
        this.baseService.toast(this.baseService.translate('common-error-success'), 'success');
        this.PageData.entityModel = new BookletDataModel();
        this.selectedTab = 'myBooklet';
        this.MyBookletselectedTab = 'uploaded';
        this.loadData();
      }
    } catch { }

    this.PageData.Waiting = false;

  }

  // Other Methods

  async payment(item: any) {
    // this.router.navigate(['./home/payment', PaymentType.BuyBooklet, item.Id]);
    this.baseService.confirm(
      this.baseService.translate('common-alert-user'),
      this.baseService.translate('Booklet-Payment-Confirm-p').replace('{-Price-}', item.Price).replace('{-Booklet-}', item.Title),
      this.baseService.translate('common-btn-confirm'),
      this.baseService.translate('common-btn-cancel')
    )
      .then(async (confirmResult: any) => {
        if (confirmResult) {
          let result = await this.bookletService.BuyBooklet_POST(item.Id);

          if (result) {
            this.baseService.toast(this.baseService.translate('common-error-success'), 'success');
            this.loadData();
          }
        }
      });
  }

  uploader(event: UploadResponseChangeEvent, field: 'CoverImageFile' | 'CurriculumFile' | 'BookletFile') {
    // this.entityModel[field] = event.FileName;
    if (field === 'BookletFile') {
      this.PageData.entityModel.BookletFile = event.FileName;
    }

    else if (field === 'CurriculumFile') {
      this.PageData.entityModel.CurriculumFile = event.FileName;
    }

    else if (field === 'CoverImageFile') {
      this.PageData.entityModel.CoverImageFile = event.FileName;
    }
  }

  onBack(action: string) {
    switch (action) {
      case 'edit':
        this.PageData.showEditBookletForm = false;
        this.PageData.entityModel = new BookletDataModel();
        break;
      case 'new':
        this.PageData.entityModel = new BookletDataModel();
        this.selectedTab = 'allItem';
        break;
    }
  }

  return(selectedTab: string, myBookletselectedTab: string, disableItem: string) {
    this.selectedTab = selectedTab;
    this.MyBookletselectedTab = myBookletselectedTab;
    switch (disableItem) {
      case 'showHeadlines':
        this.PageData.showHeadlines = false;
        break;
      case 'showBookletDetails':
        this.PageData.showBookletDetails = false;
        break;
      case 'showUserBookletDetails':
        this.PageData.showUserBookletDetails = false;
        break;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWindow()
  }

  checkWindow() {
    const width = document.getElementsByTagName('body')[0].offsetWidth;
    if (width < 1024 && width >= 992) {
      this.PageData.window = 'desktop';
    } else if (width < 991 && width >= 768) {
      this.PageData.window = 'tablet';
    } else if ((width < 768)) {
      this.PageData.window = 'mobile';
    }
  }
}

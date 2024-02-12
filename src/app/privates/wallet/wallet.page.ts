import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilteringModel, ListResultModel, ScrollableTabModel } from 'src/app/definitions/models/Common.model';
import { PaymentModel } from 'src/app/definitions/models/Entities.model';
import { BaseService } from 'src/app/services/base.service';
import { PaymentService } from 'src/app/services/payment.service';
import { StorageService } from 'src/app/services/storage.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  Categories: ScrollableTabModel[] = [];
  selectedTab: any = 'history';
  dropdownOpened = false;
  optionOpened = false;
  isModalOpen = false;
  historyWallet: any[] = [];
  depositList: any[] = [];
  questionList: any[] = [];
  openIndex: number = -1;
  InvestWallet = 0;

  entityModelPayment: PaymentModel = new PaymentModel();
  listModel: ListResultModel = new ListResultModel();
  filteringModel: FilteringModel = new FilteringModel();

  constructor(public baseService: BaseService,
    public walletService: WalletService,
    private router: Router,
    public route: ActivatedRoute,
    public storageService: StorageService,
    public paymentService: PaymentService
  ) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('selectedTab') != null) {
      this.selectedTab = this.route.snapshot.paramMap.get('selectedTab');
    }
  }

  ionViewWillEnter() {
    this.Categories = this.walletService.Categories;
    this.loadData();
  }

  loadData(event: any = null) {

    // next page or reload Items
    if (event) { this.filteringModel.PageNumber++; }
    else { this.filteringModel.PageNumber = 1; }

    this.paymentService.Credit_GET(this.filteringModel).then((result: any) => {
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
    }).finally(() => { if (event != null) { event.target.complete(); } });


    this.walletService.Receive_GET().then((result: any) => {
      if (result) {
        this.depositList = result.Items;
      }
    });
    this.walletService.Question_GET().then((result: any) => {
      if (result) {
        this.questionList = result.Items;
      }
    });
  }

  onPay() {

    if (this.InvestWallet) { this.entityModelPayment.Amount = this.InvestWallet }

    this.entityModelPayment.PaymentType = 2;

    this.baseService.confirm(
      this.baseService.translate('common-alert-user'),
      this.baseService.translate('common-alert-header'),
      this.baseService.translate('common-btn-confirm'),
      this.baseService.translate('common-btn-cancel')
    ).then(async (confirmResult: any) => {
      if (confirmResult) {
        try {

          let result = await this.walletService.POST(this.entityModelPayment);

          if (result) { this.baseService.openLink(result.Redirect_Url); }

        } catch { }

      }
    })
  }

  onCancelPay() {
    this.InvestWallet = 0;
    this.setOpen(false);
  }


  // first dropdown
  openDropdown() {
    this.dropdownOpened = !this.dropdownOpened;
  }

  // another dropdown
  openOption() {
    this.optionOpened = !this.optionOpened;
  }

  onTabClick(event: any) {
    this.selectedTab = event.value;
  }

  goToVeiw() {
    this.router.navigate(['/chat/view', 1]);
  }

  accordionGroupChange(e: any) {
    this.openIndex = e.detail.value;
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}

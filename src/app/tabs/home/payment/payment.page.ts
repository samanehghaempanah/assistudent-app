import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PaymentStatus, PaymentType } from 'src/app/definitions/models/DataTypes.model';
import { PaymentModel } from 'src/app/definitions/models/Entities.model';
import { BookletService } from 'src/app/services/Booklet.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BaseService } from 'src/app/services/base.service';
import { CoreService } from 'src/app/services/core.service';
import { FormService } from 'src/app/services/form.service';
import { PaymentService } from 'src/app/services/payment.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  PageData = { userFormId: '', paymentType: '', isCreditPay: false };
  paymententity: PaymentModel = new PaymentModel();
  Amount: number;
  paymentType: string;
  PaymentStatus: PaymentStatus;

  constructor(
    public paymentService: PaymentService,
    public route: ActivatedRoute,
    public navCtrl: NavController,
    public baseService: BaseService,
    public storageService: StorageService,
    public coreService: CoreService,
    public formService: FormService,
    private authenticationService: AuthenticationService,
    public bookletService: BookletService,
    private router: Router,) { }

  ngOnInit() {
    this.paymententity.PaymentType = Number(this.route.snapshot.paramMap.get('paymenttype'));
    this.paymententity.ReferenceNo = this.route.snapshot.paramMap.get('referenceid');

    this.loadData();
  }

  async loadData() {
    try {
      if (this.paymententity.PaymentType === PaymentType.BuyBooklet) {
        let BookletResult: any = await this.bookletService.Get(Number(this.paymententity.ReferenceNo));

        if (BookletResult) {
          this.Amount = BookletResult.Price;
          this.paymentType = this.baseService.translate('PaymentType-BuyBooklet');
        }

      }

      if (this.paymententity.PaymentType === PaymentType.VisaApplication || this.paymententity.PaymentType === PaymentType.ResidenceRequest ||
        this.paymententity.PaymentType === PaymentType.ExtensionOfStay || this.paymententity.PaymentType === PaymentType.RequestComprehensiveCode ||
        this.paymententity.PaymentType === PaymentType.RequestAccommodation || this.paymententity.PaymentType === PaymentType.ExitAndReturn ||
        this.paymententity.PaymentType === PaymentType.FinalExit || this.paymententity.PaymentType === PaymentType.Facility || this.paymententity.PaymentType === PaymentType.IssuanceOfStudentCard
        || this.paymententity.PaymentType === PaymentType.Translate) {

        let FormResult: any = await this.formService.Form_Get(Number(this.paymententity.ReferenceNo));

        if (FormResult) {
          if (FormResult.UserForm_PaymentStatus && FormResult.UserForm_PaymentStatus === PaymentStatus.Successfull) { this.router.navigate(['/home']); }

          this.Amount = FormResult.UserForm_PaymentAmount;
          this.paymentType = FormResult.PaymentType_Title;

        }

      }

    } catch { }


  }

  async onPay() {
    try {

      if (!this.PageData.isCreditPay) {
        const returnUrl = this.getReturnUrl();
        this.paymententity.Amount = this.Amount;

        let result: any = await this.paymentService.POST(this.paymententity);

        if (result && result.Redirect_Url) {
          this.baseService.openLink(result.Redirect_Url);
          this.router.navigate([returnUrl]);
        }
      }
      else if (this.PageData.isCreditPay) {
        const returnUrl = this.getReturnUrl();
        if (this.storageService.User.TotalCredit >= this.Amount) {
          this.paymententity.Amount = this.Amount;

          let result: any = await this.paymentService.Credit_POST(this.paymententity);

          if (result) {
            this.authenticationService.Info();
            this.router.navigate([returnUrl]);
            this.baseService.toast(this.baseService.translate('common-error-success'), 'success');
          }
        }

        else if (this.storageService.User.TotalCredit < this.paymententity.Amount) {
          const returnUrl = this.getReturnUrl();
          this.paymententity.Amount = this.Amount - this.storageService.User.TotalCredit;

          let OnlineResult: any = await this.paymentService.POST(this.paymententity);

          if (OnlineResult && OnlineResult.Redirect_Url) {
            this.baseService.openLink(OnlineResult.Redirect_Url);
            this.router.navigate([returnUrl]);
          }

        }
      }

    } catch { }

  }


  calculatePaymentFinall() {

    if (this.PageData.isCreditPay && this.Amount && this.storageService.User.TotalCredit) {

      if (this.storageService.User.TotalCredit < this.Amount) {

        this.paymententity.Amount = this.Amount - this.storageService.User.TotalCredit;

      }

      else if (this.storageService.User.TotalCredit >= this.Amount) {

        this.paymententity.Amount = this.Amount;

      }

      return Number(this.paymententity.Amount);

    } else {

      this.paymententity.Amount = this.Amount;

      return Number(this.paymententity.Amount);
    }

  }

  calculatePaymentWallet() {
    let total = 0;

    if (this.storageService.User.TotalCredit < this.Amount) {

      let payment = this.Amount - this.storageService.User.TotalCredit;

      total = this.Amount - payment;
    }

    else if (this.storageService.User.TotalCredit > this.Amount) {

      total = this.Amount;

    }

    return total;

  }

  onSelectedCreditPay(event: any) { this.PageData.isCreditPay = event.detail.checked; }

  getReturnUrl(): string {
    const currentUrl = this.route.snapshot.paramMap.get('lastpage');

    if (currentUrl === '10') { return '/home/form/history'; }

    else if (currentUrl === '11') { return '/wallet'; }

    else { return '/home'; }
  }
}

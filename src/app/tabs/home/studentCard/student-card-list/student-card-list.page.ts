import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ScrollableTabModel } from 'src/app/definitions/models/Common.model';
import { StudentCardType } from 'src/app/definitions/models/DataTypes.model';
import { NewCard, StudentCardModel } from 'src/app/definitions/models/Entities.model';
import { BaseService } from 'src/app/services/base.service';
import { StorageService } from 'src/app/services/storage.service';
import { StudentCardService } from 'src/app/services/student-card.service';

@Component({
  selector: 'app-student-card-list',
  templateUrl: './student-card-list.page.html',
  styleUrls: ['./student-card-list.page.scss'],
})
export class StudentCardListPage implements OnInit {
  @ViewChild('popover') popover: any;

  tabs: ScrollableTabModel[] = [];
  pageData = {
    selectedTab: 'new',
    isHistoryEmpty: true,
    studentNo: 0,
    Waiting: false,
    Loaded: false,
    isOpen: false,
    isStudent: false,
    popoverDescription: '',
    paymentCount: ''
  }
  newCardModel!: NewCard;
  cardHistoryItems: any[] = [];
  TypeCardList: any[] = [];
  studentCard: StudentCardModel = new StudentCardModel();

  constructor(public baseService: BaseService, private cardService: StudentCardService, public navCtrl: NavController, public storageService: StorageService) { }

  ngOnInit() { this.pageData.studentNo = this.storageService.User.LastStudentNo; }

  ionViewWillEnter() {
    this.tabs = this.cardService.tabs;

    this.loadData();
  }

  async loadData() {

    this.pageData.Loaded = true;

    try {

      let HistoryResult = await this.cardService.Get(this.pageData.studentNo);

      if (HistoryResult && HistoryResult.Items) {

        this.pageData.isHistoryEmpty = HistoryResult.Items.length === 0 ? true : false;
        this.cardHistoryItems = HistoryResult.Items

        if (this.pageData.isHistoryEmpty) { this.pageData.selectedTab = 'new'; }

        else { this.pageData.selectedTab = 'history'; }
      }

      else { this.pageData.isStudent = false; }

      let TypeResult = await this.cardService.Type_GET();

      if (TypeResult) {

        TypeResult.Items.forEach((element: any) => {

          let type = {
            Title: element.Title,
            Amount: element.Amount,
            Description: element.Description,
            CardOrderType: element.CardOrderType,
            Disabled: false
          }

          this.TypeCardList.push(type);
        });

        this.TypeCardList.forEach((element: any) => {

          if (element.CardOrderType === StudentCardType.NewCard && !this.pageData.isHistoryEmpty) {
            element.Disabled = true;
          }

          else if (element.CardOrderType !== StudentCardType.NewCard && this.pageData.isHistoryEmpty) {
            element.Disabled = true;
          }

        });

      }

      else { this.pageData.isStudent = false; }

    } catch { }

    this.pageData.Loaded = false;

  }

  onTabClick(event: any) {
    this.pageData.selectedTab = event.value;
  }

  presentPopover(e: Event, type: any) {
    this.pageData.popoverDescription = type.Description;
    // this.popover.event = e;
    this.pageData.isOpen = true;
  }

  async onSave() {
    this.pageData.Waiting = true;
    this.studentCard.StudentNo = this.pageData.studentNo.toString();

    try {
      const result = await this.cardService.POST(this.studentCard)

      if (result) {
        this.baseService.openLink(result.Redirect_Url);
      }

    } catch { }

    this.pageData.Waiting = false;
  }

  handleRadioGroup(e: any) {
    this.pageData.paymentCount = e.detail.value.Amount;
    this.studentCard.CardOrderType = e.detail.value.CardOrderType;
  }

  onCancelBtn() {
    this.navCtrl.back();
  }
}

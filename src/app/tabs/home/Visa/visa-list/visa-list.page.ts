import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrollableTabModel } from 'src/app/definitions/models/Common.model';
import { FormStatus } from 'src/app/definitions/models/DataTypes.model';
import { BaseService } from 'src/app/services/base.service';
import { VisaService } from 'src/app/services/visa.service';

@Component({
  selector: 'app-visa-list',
  templateUrl: './visa-list.page.html',
  styleUrls: ['./visa-list.page.scss'],
})

export class VisaListPage implements OnInit {
  Categories: ScrollableTabModel[] = [];
  selectedTab: any = 'new';
  visaList: any[] = [];
  FormStatus = FormStatus;

  constructor(
    public route: ActivatedRoute,
    public baseService: BaseService,
    public visaService: VisaService,
  ) {}

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('selectedTab') != null) {
      this.selectedTab = this.route.snapshot.paramMap.get('selectedTab');
    }
  }

  ionViewWillEnter() {
    this.Categories = this.visaService.Categories;
    this.loadData();
  }

  loadData() {
    this.visaService.GET().then((res: any) => {
      this.visaList = res.Items;
    });
  }

  onTabClick(event: any) {
    this.selectedTab = event.value;
  }
}

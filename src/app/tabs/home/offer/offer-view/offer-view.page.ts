import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BaseService } from 'src/app/services/base.service';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-offer-view',
  templateUrl: './offer-view.page.html',
  styleUrls: ['./offer-view.page.scss'],
})
export class OfferViewPage implements OnInit {
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private location:Location,
    public baseService: BaseService,
    public offerService: OfferService,
  ) {}

  OfferId: any;
  offerDetails: any;
  
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.OfferId = params.get('id');
      this.loadData(this.OfferId);
    });
  }

  loadData(offerId: any) {
    this.offerService.Get(offerId).then((res: any) => {
      this.offerDetails = res;
    });
  }

  backLocation() {
    this.location.back()
  }
}

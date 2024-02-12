import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BaseService } from '../../../../services/base.service';
import { FacilitiesService } from '../../../../services/facilities.service';


@Component({
  selector: 'app-facility-view',
  templateUrl: './facility-view.page.html',
  styleUrls: ['./facility-view.page.scss'],
})
export class FacilityViewPage implements OnInit {

  FacilityItems: any[] = [];
  id:any;
  selectedPackage: string = this.baseService.translate('facility-select-package-default');
  displayPackages: boolean = false;
  packages : Array<any> = [];
  tags : Array<any> = [];
  images : Array<any> = [] 
  isNewFacility: boolean = false;
  

  constructor(public baseService: BaseService,
    public facilitiesService: FacilitiesService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if(params.get('name')=== 'new'){
        this.isNewFacility = true;
      }
      else {
        this.isNewFacility = false;
      }
      console.log('facilityName: ' , params.get('name'));
      this.id = params.get('id')
      console.log('facilityId: ' , this.id);
    })
    this.loadFacilitysListFiltered();
    this.packages = this.facilitiesService.FacilityViewPackage;
    this.tags = this.facilitiesService.Tags;
    this.images = this.facilitiesService.FacilityViewImages;
  }

  loadFacilitysListFiltered() {
    this.facilitiesService.FacilitysListFiltered(this.id).then((result: any) => {
      if (result) {
        console.log(result.items);
        this.FacilityItems = result.items;
      }
    });
  }

  onFacilityBuy(facility: any) {
    this.baseService
      .confirm(
        this.baseService.translate('common-alert-user'),
        this.baseService.translate('common-alert-header-facility-buy').replace('{-title-}', facility.title),
        this.baseService.translate('common-btn-confirm'),
        this.baseService.translate('common-btn-cancel')
      )
      .then((confirmResult: any) => {
        if (confirmResult) {
          this.facilitiesService.BuyFacilitys(facility.id , facility.startDate ,facility.price).then((result: any) => {
            if (result) {
              console.log(result.items);
            }
          });
        }
      });
  }

  selectPackage(pack:any){
    this.selectedPackage = pack;
    this.displayPackages = true;
  }
}

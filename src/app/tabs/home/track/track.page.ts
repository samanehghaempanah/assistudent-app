import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ModalController, NavController } from '@ionic/angular';
import { FilteringModel, ListResultModel } from 'src/app/definitions/models/Common.model';
import { FieldType, filteringOperationType } from 'src/app/definitions/models/DataTypes.model';
import { AddressModel, StationModel, StationStartTimeModel } from 'src/app/definitions/models/Entities.model';
import { DayOfWeekPipe } from 'src/app/definitions/pipes/day-of-week.pipe';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BaseService } from 'src/app/services/base.service';
import { CoreService } from 'src/app/services/core.service';
import { StationService } from 'src/app/services/station.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.page.html',
  styleUrls: ['./track.page.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class TrackPage implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;

  entityModel: StationModel[] = [];
  entityModelAddress: AddressModel = new AddressModel();
  listModel: ListResultModel = new ListResultModel();
  filteringModel: FilteringModel = new FilteringModel();
  zoneParentId: any;
  stateItems: any[] = [];
  cityItems: any[] = [];
  trackList: any[] = [];
  FromTimeList: StationStartTimeModel[] = [];
  ToTimeList: any[] = [];

  activeTrackRow: any = null;
  activeTrackTime: any = null;
  isModalOpen: boolean = false;
  isAddress: boolean = false;
  addressId: number = 0;


  stationSelectItems: any[] = [];
  stationItems: any[] = [];

  firstFormGroup: FormGroup = this.formBuilder.group({
    radioGruopControl: ['false', Validators.required]
  });


  secondFormGroup: FormGroup = this.formBuilder.group({
    stateControl: ['', Validators.required],
    cityControl: ['', Validators.required],
    addressControl: ['', Validators.required],
    postalCodeControl: ['', Validators.pattern('[0-9]{10}')],
  });


  thirdFormGroup: FormGroup = this.formBuilder.group({
    stationStartControl: ['', Validators.required],
    stationStartTimeControl: ['', Validators.required],
    stationEndControl: ['', Validators.required],
    stationEndTimeControl: ['', Validators.required],
    dayControl: ['', Validators.required],
  });

  constructor(
    public baseService: BaseService,
    public formBuilder: FormBuilder,
    public modal: ModalController,
    public storageService: StorageService,
    public stationService: StationService,
    public coreService: CoreService,
    public navController: NavController,
    public authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    // For Load station & days 
    this.stationService.GET().then((result: any) => {
      if (result) {
        result.DayList.forEach((element: any) => {
          this.trackList.push({ Id: 0, Day_Id: element.Day_Id, Day_Title: element.Day_Title, DayRelatedNumber: element.DayRelatedNumber, startLocation: null, endLocation: null });
        })
        this.loadDataUserstation();
        this.stationSelectItems = result.StationList;

        result.FromTimeList.forEach((element: any) => {
          this.FromTimeList.push({ Id: element.Id, MoveDateTime: element.MoveDateTime, MoveTime: element.MoveTime, MoveDate: element.MoveDate, Side: 'start' });
        })

        result.ToTimeList.forEach((element: any) => {
          this.ToTimeList.push({ Id: element.Id, MoveDateTime: element.MoveDateTime, MoveTime: element.MoveTime, MoveDate: element.MoveDate, Side: 'end' });
        })
      }
    });

    // For Load User address Information & Station service
    this.authenticationService.Address_GET().then((result: any) => {
      if (result.Address) {
        this.entityModelAddress = result;
        this.secondFormGroup.patchValue({
          stateControl: result.Province_Id,
          cityControl: result.City_Id,
          addressControl: result.Address,
          postalCodeControl: result.PostalCode,
        });
        this.addressId = result.Id;
        this.isAddress = true
        this.handleStateChange(this.secondFormGroup.value.stateControl);


      } else {
        this.isAddress = false
      }
    });

    this.storageService.User.Fields.forEach((item: any) => {
      if (item.FieldType === FieldType.UseGPS) {
        if (item.Value === 'true') {
          this.firstFormGroup.patchValue({
            radioGruopControl: 'true'
          });
        } else {
          this.firstFormGroup.patchValue({
            radioGruopControl: 'false'
          });
        }
      }
    })

    this.loadDataZone();
  }

  loadDataZone() {
    let myFilteringModel = new FilteringModel();
    myFilteringModel.PageSize = 1278;
    myFilteringModel.AddCondition("ZoneType_Title", "Province", filteringOperationType.Equal);
    this.coreService.Zone_GET(myFilteringModel).then((result: any) => {
      if (result) {
        this.stateItems = result.Items;
      }
    });
  }

  handleRadioGroup(e: any) {
    if (e.detail.value === 'true') {
      this.stepper.next();
    }
  }

  handleStateChange(e: any) {
    let myFilteringZoneModel = new FilteringModel();
    myFilteringZoneModel.PageSize = 100;
    // if (this.isAddress === true) {
    //   myFilteringZoneModel.AddCondition("Parent_Id", e, filteringOperationType.Equal);
    // } else {
    // }
    if (e) {
      myFilteringZoneModel.AddCondition("Parent_Id", e.detail.value, filteringOperationType.Equal);
      this.coreService.Zone_GET(myFilteringZoneModel).then((result: any) => {
        if (result) {
          this.cityItems = result.Items;
        }
      });
    }
  }

  dontShow() {
    this.storageService.hideTrackNotification = true;
  }

  setTrack(item: any) {
    const el = this.trackList.find((el) => el === this.activeTrackRow);
    if (this.activeTrackTime.Side === 'start') {
      el.startLocation = {
        DepartureStation_Id: item.Station_Id,
        DepartureStation_Title: item.Station_Title,
        DepartureTime_Id: this.activeTrackTime.Id,
        DepartureTime: this.activeTrackTime.MoveTime
      };
    } else {
      el.endLocation = {
        DestinationStation_Id: item.Station_Id,
        DestinationStation_Title: item.Station_Title,
        DestinationTime_Id: this.activeTrackTime.Id,
        DestinationTime: this.activeTrackTime.MoveTime
      };
    }
    this.setOpen(false);
  }

  deleteTrack() {
    const el = this.trackList.find((el) => el === this.activeTrackRow);
    if (this.activeTrackTime.Side === 'start') {
      el.startLocation = null;
    } else {
      el.endLocation = null;
    }
    this.setOpen(false);
  }

  selectTrack(item: any, timeItem: any) {
    this.activeTrackTime = timeItem;
    this.activeTrackRow = item;
    this.setOpen(true);
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  onNextStep() {
    if (this.secondFormGroup.invalid) {
      this.secondFormGroup.markAllAsTouched();
      this.baseService.toast(this.baseService.translate('track-ts-noti-address'), 'danger');
    }
    else {
      this.stepper.next();
    }
  }

  save() {
    if (this.firstFormGroup.invalid) {
      this.secondFormGroup.markAllAsTouched();
      this.baseService.toast(this.baseService.translate('track-ts-noti-info'), 'danger');
      return
    }
    if (this.secondFormGroup.invalid) {
      this.secondFormGroup.markAllAsTouched();
      this.baseService.toast(this.baseService.translate('track-ts-noti-address'), 'danger');
      return
    }

    // Save Use GPS Service
    let body =
    {
      Id: 0,
      FieldType: FieldType.UseGPS,
      FieldType_Title: "UseGPS",
      Title: "دسترسی کاربر به سرویس حمل و نقل",
      Value: this.firstFormGroup.value.radioGruopControl,
      Client_Id: this.storageService.User.Client_Id
    }

    this.stationService.Usegps_POST(body).then((result: any) => {
      if (result) {
        this.onSaveStation();
      } else {
        this.baseService.toast(this.baseService.translate('common-error-danger'), 'danger');
      }
    });
  }

  onSaveAddress() {
    // Save Address User Information
    this.entityModelAddress.Address = this.secondFormGroup.value.addressControl,
      this.entityModelAddress.PostalCode = this.secondFormGroup.value.postalCodeControl,
      this.entityModelAddress.Province_Id = this.secondFormGroup.value.stateControl,
      this.entityModelAddress.City_Id = this.secondFormGroup.value.cityControl,
      this.entityModelAddress.Province_Id = this.secondFormGroup.value.stateControl

    if (this.isAddress === false) {
      this.authenticationService.Address_POST(this.entityModelAddress).then((result: any) => {
        if (result) {
          this.baseService.toast(this.baseService.translate('common-error-success'), 'success');
          this.navController.back();
        } else {
          this.baseService.toast(this.baseService.translate('common-error-danger'), 'danger');
        }
      });
    } else {
      this.authenticationService.Address_PUT(this.entityModelAddress.Id, this.entityModelAddress).then((result: any) => {
        if (result) {
          this.baseService.toast(this.baseService.translate('common-error-success'), 'success');
          this.navController.back();
        } else {
          this.baseService.toast(this.baseService.translate('common-error-danger'), 'danger');
        }
      });
    }
  }

  onSaveStation() {
    // Disabled not exist items 
    let state: StationModel[] = [];
    this.trackList.forEach((element: any) => {
      this.entityModel.forEach((item: any) => {
        if (item.Day_Id === element.Day_Id) {
          state.push(element);
        }
      });

    });
    this.entityModel = state;

    // Save Station User Information
    // PUT
    if (this.entityModel.length > 0) {
      
      this.entityModel.forEach((el: any) => {
        let StationsItemsPut = {
          Id: el.Id,
          RelatedNumber: el.RelatedNumber,
          Semester_Id: el.Semester_Id,
          Client_Id: this.storageService.User.Client_Id,
          DepartureStation_Id: el.startLocation.DepartureStation_Id,
          DestinationStation_Id: el.endLocation.DestinationStation_Id,
          Day_Id: el.Day_Id,
          DepartureTime_Id: el.startLocation.DepartureTime_Id,
          DestinationTime_Id: el.endLocation.DestinationTime_Id
        };
        this.stationService.PUT(el.Id, StationsItemsPut).then((result: any) => {
          if (result) {
            this.baseService.toast(this.baseService.translate('common-error-success'), 'success');
          } else {
            this.baseService.toast(this.baseService.translate('common-error-danger'), 'danger');
          }
        });
      })
    }

    // POST
    if (this.trackList.length > 0) {
      this.trackList = this.trackList.filter((elem) => elem.Id === 0);
      let StationsItems: any[] = [];
      let error: boolean = false;
      this.trackList.forEach((el) => {
        if ((el.startLocation !== null && el.endLocation === null) || (el.startLocation === null && el.endLocation !== null)) {
          error = true;
          let msg = this.baseService.translate('track-ts-noti-way');
          this.baseService.toast(msg.replace('{{value}}', el.DayTitle), 'warning');
          return;
        } else if ((el.startLocation !== null && el.endLocation !== null)) {
          StationsItems.push({
            Client_Id: this.storageService.User.Client_Id,
            DepartureStation_Id: el.startLocation.DepartureStation_Id,
            DestinationStation_Id: el.endLocation.DestinationStation_Id,
            Day_Id: el.Day_Id,
            DepartureTime_Id: el.startLocation.DepartureTime_Id,
            DestinationTime_Id: el.endLocation.DestinationTime_Id
          });

          this.stationService.POST(StationsItems).then((result: any) => {
            if (result) {
              this.baseService.toast(this.baseService.translate('common-error-success'), 'success');
            } else {
              this.baseService.toast(this.baseService.translate('common-error-danger'), 'danger');
            }
          });
        }
      });
    }

    this.onSaveAddress();
  }

  onDeleteStation(item: any, i: any) {
    if (item.Id > 0) {
      this.stationService.DELETE(item.Id).then((result: any) => {
        if (result) {
          this.baseService.toast(this.baseService.translate('common-error-success'), 'success');
          // Remove From trackList
          let el = this.trackList.find((el) => el.Id === item.Id);
          el.Id = 0;
          el.startLocation = null;
          el.endLocation = null;

          // Remove From entityModel
          this.entityModel = this.entityModel.filter((el) => el.Id === item.Id);

        } else {
          this.baseService.toast(this.baseService.translate('common-error-danger'), 'danger');
        }
      });
    } else {
      let el = this.trackList.find((el) => el === item);
      el.startLocation = null;
      el.endLocation = null;
    }

  }

  loadDataUserstation() {
    this.stationService.Get().then((result: any) => {
      if (result) {
        this.entityModel = result.Items;
        result.Items.forEach((element: StationModel) => {
          if (this.trackList.length > 0) {
            const index = this.trackList.findIndex((el: any) => el.Day_Id === element.Day_Id);
            this.trackList[index] = {
              Id: element.Id,
              Day_Id: element.Day_Id,
              Day_Title: element.Day_Title,
              RelatedNumber: element.RelatedNumber,
              Semester_Id: element.Semester_Id,
              startLocation: {
                DepartureStation_Id: element.DepartureStation_Id,
                DepartureStation_Title: element.DepartureStation_Title,
                DepartureTime_Id: element.DepartureTime_Id,
                DepartureTime: element.DepartureTime
              },
              endLocation: {
                DestinationStation_Id: element.DestinationStation_Id,
                DestinationStation_Title: element.DestinationStation_Title,
                DestinationTime_Id: element.DestinationTime_Id,
                DestinationTime: element.DestinationTime
              }
            };
          }
        });
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ScrollableTabModel } from 'src/app/definitions/models/Common.model';
import {
  FieldType,
  FormStatus,
} from 'src/app/definitions/models/DataTypes.model';
import { UploadResponseChangeEvent } from 'src/app/definitions/models/upload.model';
import { BaseService } from 'src/app/services/base.service';
import { StorageService } from 'src/app/services/storage.service';
import { VisaService } from 'src/app/services/visa.service';

@Component({
  selector: 'app-visa-view',
  templateUrl: './visa-view.page.html',
  styleUrls: ['./visa-view.page.scss'],
})
export class VisaViewPage implements OnInit {
  Categories: ScrollableTabModel[] = [];
  selectedTab: any = 'new';
  FormStatus = FormStatus;
  FieldType = FieldType;
  formId = 0;
  userFormId = 0;
  visaForm: any;
  title: any;
  showDescription = true;
  Editable = true;

  constructor(
    public route: ActivatedRoute,
    public navControl: NavController,
    public baseService: BaseService,
    public storageService: StorageService,
    public visaService: VisaService
  ) {}

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('selectedTab') != null) {
      this.selectedTab = this.route.snapshot.paramMap.get('selectedTab');
    }

    this.formId = Number(this.route.snapshot.paramMap.get('formId') ?? 0);
    this.userFormId = Number(
      this.route.snapshot.paramMap.get('userFormId') ?? 0
    );

    this.loadData();
  }

  loadData() {
    this.visaService.Get(this.formId, this.userFormId).then((res: any) => {
      this.visaForm = res;
      if (
        this.visaForm.UserForm_Status == FormStatus.Submit ||
        this.visaForm.UserForm_Status == FormStatus.Inprogress ||
        this.visaForm.UserForm_Status == FormStatus.Accept
      ) {
        this.Editable = false;
      }
      this.title = this.visaForm.Title;
    });
  }

  draft() {
    this.visaService.Draft(this.visaForm).then(
      (result: any) => {
        if (result) {
          this.visaForm = result;
          this.baseService.toast(
            this.baseService.translate('common-error-success'),
            'success'
          );
          this.navControl.back();
        } else {
          this.baseService.toast(
            this.baseService.translate('common-error-danger'),
            'danger'
          );
        }
      },
      (err) => {}
    );
  }

  submit() {
    this.visaService.Submit(this.visaForm).then(
      (result: any) => {
        if (result) {
          this.visaForm = result;
          this.baseService.toast(
            this.baseService.translate('common-error-success'),
            'success'
          );
          this.navControl.back();
        } else {
          this.baseService.toast(
            this.baseService.translate('common-error-danger'),
            'danger'
          );
        }
      },
      (err) => {}
    );
  }

  showMore() {
    this.showDescription = !this.showDescription;
  }

  pinFormatter(value: number) {
    return `${value}%`;
  }

  uploder(event: UploadResponseChangeEvent, field: any) {
    field.Value = event.FileName;
  }
}

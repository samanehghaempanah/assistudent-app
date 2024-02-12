import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { FilteringModel, ListResultModel } from 'src/app/definitions/models/Common.model';
import { FieldType, FormStatus, PaymentStatus, PaymentType, RoleCode, filteringOperationType } from 'src/app/definitions/models/DataTypes.model';
import { UploadResponseChangeEvent } from 'src/app/definitions/models/upload.model';
import { BaseService } from 'src/app/services/base.service';
import { FormService } from 'src/app/services/form.service';
import { StorageService } from 'src/app/services/storage.service';
import { ImageViewerComponent } from 'src/app/components/image-viewer/image-viewer.component';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.page.html',
  styleUrls: ['./form-view.page.scss'],
})
export class FormViewPage implements OnInit {
  PageData = {
    isNonIranian: false,
  }

  FieldType = FieldType;
  FormStatus = FormStatus;
  PaymentStatus = PaymentStatus;
  PaymentType = PaymentType;
  formId = 0;
  userFormId = 0;
  form: any;
  title: any;
  showDescription = true;
  Editable = true;
  radioListOption: any[] = [];
  checkValue: any[];
  isModalOpen: false;
  imageSrc: any;
  isFeildComplate = false;
  isInValidUploader = '';

  listModel: ListResultModel = new ListResultModel();
  filteringModel: FilteringModel = new FilteringModel();

  constructor(
    private router: Router,
    public navCtrl: NavController,
    public route: ActivatedRoute,
    public baseService: BaseService,
    public storageService: StorageService,
    public formService: FormService,
    public navControl: NavController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.formId = Number(this.route.snapshot.paramMap.get('formId') ?? 0);
    this.userFormId = Number(this.route.snapshot.paramMap.get('userFormId') ?? 0);
    this.loadData();
    this.loadHistory();

    if (this.baseService.authenticated) {
      this.storageService.User.Roles.forEach((el: any) => {
        if (el.Role_Code === RoleCode.StudentEnglish || el.Role_Code === RoleCode.StudentArabic || el.Role_Code === RoleCode.StudentAfghan) {
          this.PageData.isNonIranian = true;
        }
      });
    }
  }

  loadData() {
    this.formService.Get(this.formId, this.userFormId).then((res: any) => {
      this.fillData(res);
    });
  }

  loadHistory(event: any = null) {
    if (event) { this.filteringModel.PageNumber++; }
    else { this.filteringModel.PageNumber = 1; }
    if (this.userFormId > 0) {
      this.filteringModel.AddCondition("UserForm_Id", this.userFormId, filteringOperationType.Equal);
    } else {
      this.filteringModel.RemoveCondition("UserForm_Id");
      return;
    }
    this.formService.History(this.filteringModel).then((result: any) => {
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

  fillData(res: any) {
    if (res) {

      this.title = res.Title;

      if (res.UserForm_Status == FormStatus.Submit || res.UserForm_Status == FormStatus.Inprogress || res.UserForm_Status == FormStatus.Accept) {
        this.Editable = false;
      }

      // Convert to JSON & Push to Value
      res.Fields.forEach((element: any, indx: number) => {

        if (element.FieldType === FieldType.RadioComponent || element.FieldType === FieldType.SelectComponent) {

          if (element.DefaultValue === "") { element.PossibleValue = JSON.parse(element.PossibleValue); }

          else { element.DefaultValue = JSON.parse(element.DefaultValue); }

          element.Value = parseInt(element.Value);

        }

        if (element.FieldType === FieldType.CheckComponent) {

          if (element.DefaultValue === "") { element.PossibleValue = JSON.parse(element.PossibleValue); }

          else { element.DefaultValue = JSON.parse(element.DefaultValue); }

          element.Value = JSON.parse(element.Value);
        }

        // replace elemnt code by element index in conditions & validations
        if (element.Code) {

          const regex = new RegExp(element.Code, "g");

          if (res.PaymentFormula) { res.PaymentFormula = res.PaymentFormula.replace(regex, indx.toString()); }

          res.Fields.forEach((formfield: any) => {

            if (formfield.Validation) { formfield.Validation = formfield.Validation.replace(regex, indx.toString()); }

            if (formfield.Condition) { formfield.Condition = formfield.Condition.replace(regex, indx.toString()); }
          });

        }

        if (element.Validation) {
          element.Validation = JSON.parse(element.Validation);
        }
      });

      this.form = res;
    }
  }

  checkFieldCondition(field: any, fields: any[]) {
    field.chekCondition = true;

    if (field.Condition && field.Condition.length > 0 && fields.length > 0) { field.chekCondition = eval(field.Condition); }

    return field.chekCondition;
  }

  onsizeValidation(event: any, field: any, fields: any[]) {
    if (event) {
      this.isInValidUploader = event;
      this.checkFieldValidation(field, fields)
    }
  }

  checkFieldValidation(field: any, fields: any[]) {

    let validationMessage: string = null;

    if (field.chekCondition && field.Validation && fields.length > 0) {
      try {

        // Check Required
        if (field.Required && (field.Value === null || field.Value === '')) {
          validationMessage = this.baseService.translate('form-view-validation-required');
        }

        // let objValidation = JSON.parse(field.Validation);
        let objValidation = field.Validation;

        // Check Min & Max
        if (objValidation.Min && field.Value && Number(field.Value) < Number(objValidation.Min)) { validationMessage = this.baseService.translate('form-view-validation-min').replace('{{value}}', objValidation.Min); }
        if (objValidation.Max && field.Value && Number(field.Value) > Number(objValidation.Max)) { validationMessage = this.baseService.translate('form-view-validation-max').replace('{{value}}', objValidation.Max); }

        // Check Null for Exception
        if (field.Required && field.FieldType === FieldType.NumberInput) {
          if (objValidation.Min && (field.Value || field.Value === 0 || field.Value === null) && Number(field.Value) < Number(objValidation.Min)) { validationMessage = this.baseService.translate('form-view-validation-min').replace('{{value}}', objValidation.Min); }
        }

        // Check MinLenght & MaxLength
        if (objValidation.MinLenght && field.Value && field.Value.length < Number(objValidation.MinLenght)) { validationMessage = this.baseService.translate('form-view-validation-minLen').replace('{{value}}', objValidation.MinLenght); }
        if (objValidation.MaxLength && field.Value && field.Value.length > Number(objValidation.MaxLength)) { validationMessage = this.baseService.translate('form-view-validation-maxLen').replace('{{value}}', objValidation.MaxLength); }

        // Check MinSize & MaxSize
        if (objValidation.MinSize && this.isInValidUploader === 'minSize') { validationMessage = this.baseService.translate('form-view-validation-minSize').replace('{{value}}', objValidation.MinSize); }
        if (objValidation.MaxSize && this.isInValidUploader === 'maxSize') { validationMessage = this.baseService.translate('form-view-validation-maxSize').replace('{{value}}', objValidation.MaxSize); }

        return validationMessage;
      }
      catch { }
    }

    return validationMessage;
  }

  calculatePaymentFormula() {

    if (this.form && this.form.PaymentFormula && this.Editable) {

      if (isNaN(this.form.PaymentFormula)) {

        this.form.UserForm_PaymentAmount = eval(this.form.PaymentFormula);

        return this.form.UserForm_PaymentAmount;
      }

      this.form.UserForm_PaymentAmount = Number(this.form.PaymentFormula);

      return this.form.UserForm_PaymentAmount;
    }

    return 0;
  }

  isFeildComplated(field: any, fields: any[]) {
    field.complated = false;

    if (fields.length > 0) {

      if (!field.chekCondition) {
        field.Required = false;
        field.complated = true;
      }

      if (!field.Required) { field.complated = true; }

      if (field.Required && (field.Value || field.Value === '0' || field.Value === 0)) { field.complated = true; }      
    }

    return field.complated;
  }

  isFormComplated() {
    return this.form.Fields.every((element: any) => {

      if (element.complated) { return true;}
      if (!element.chekCondition) { return true;}

      return false;
    });
  }

  draft() {
    // Convert to JSON & Push to Value
    let formClone = { ...this.form };

    formClone.Fields.forEach((element: any) => {
      element.PossibleValue = '';
      element.DefaultValue = '';
      element.Validation = '';

      if (!element.chekCondition) { element.Required = false; }

      if (element.Required && (element.Value || element.Value === 0)) { this.isFeildComplate = true; }

      if (element.Value || element.Value === 0) { element.Value = element.Value.toString(); }

      else { element.Value = ''; }
    });

    if (this.isFeildComplate) {

      this.formService.Draft(formClone).then((result: any) => {

        if (result) {

          this.fillData(result);

          this.baseService.toast(this.baseService.translate('common-error-success'), 'success');

          this.navControl.back();

        }
      },

        (err) => { }
      );
    }

    else { this.baseService.toast(this.baseService.translate('form-view-validation-send'), 'warning'); }
  }

  submit() {
    // Convert to JSON & Push to Value
    let formClone = JSON.parse(JSON.stringify(this.form));

    formClone.Fields.forEach((element: any) => {
      element.PossibleValue = '';
      element.DefaultValue = '';
      element.Validation = '';

      if (!element.chekCondition) { element.Required = false; }

      if (element.Required && (element.Value || element.Value === 0)) { this.isFeildComplate = true; }

      if (element.Value || element.Value === 0) { element.Value = element.Value.toString(); }

      else { element.Value = ''; }
    });

    if (this.form.UserForm_Status === FormStatus.Submit && this.form.UserForm_PaymentAmount > 0) {
      this.router.navigate(['home/payment', 10, this.form.PaymentType, this.form.UserForm_Id]);
    }

    else {

      if (this.isFeildComplate) {

        this.formService.Submit(formClone).then((result: any) => {

          if (result) {

            this.fillData(result);

            this.baseService.toast(this.baseService.translate('common-error-success'), 'success');

            if (result.UserForm_PaymentAmount > 0) { this.router.navigate(['home/payment', 10, result.PaymentType, result.UserForm_Id]); }

            else { this.navControl.back(); }

          }
        },
          (err) => { }
        );
      }

      else { this.baseService.toast(this.baseService.translate('form-view-validation-send'), 'warning'); }
    }
  }

  uploder(event: UploadResponseChangeEvent, field: any) { field.Value = event.FileName; }

  pinFormatter(value: number) { return `${value}%`; }

  showMore() { this.showDescription = !this.showDescription; }

  onChangeCheckbox(event: any) {

    const checkboxes = Array.from(document.querySelectorAll('ion-checkbox'));

    this.checkValue = checkboxes.filter((checkbox: any) => checkbox.checked).map((checkbox: any) => checkbox.value);

    this.form.Fields.forEach((element: any) => {

      if (element.FieldType === FieldType.CheckComponent) { element.Value = JSON.stringify(this.checkValue) }

    });
  }

  onChangeDate(event: any, field: any) { field.Value = event; }

  setOpen(isOpen: any) { this.isModalOpen = isOpen; }

  async onShowImage(src: any) {
    this.imageSrc = src;
    const modal = await this.modalCtrl.create({
      component: ImageViewerComponent,
      componentProps: { imgSrc: this.imageSrc },
    });
    modal.present();
  }

}

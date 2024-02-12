import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActionSheetController, IonModal } from '@ionic/angular';
import * as moment from 'jalali-moment';
import { FieldType, RoleCode } from 'src/app/definitions/models/DataTypes.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BaseService } from 'src/app/services/base.service';
import { StorageService } from 'src/app/services/storage.service';
import { UploadFileService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  PageData = { isNonIranian: false }

  imageFile!: File;
  imageUrl: string | null = null;
  fileName: string = '';
  FieldType = FieldType;

  isPasswordModalOpen = false;
  isBirthModalOpen = false;

  memberData = this.storageService.User;
  pageDataChangePassword = { oldPassword: '', newPassword: '', confirmNewPassword: '' }
  useGps: boolean = false;

  constructor(public baseService: BaseService,
    private actionSheet: ActionSheetController,
    private upload: UploadFileService,
    public storageService: StorageService,
    public authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.loadDataMemberInfo();

    this.memberData.Fields.forEach((element: any) => {
      if (element.FieldType === FieldType.UseGPS) {
        this.useGps = element.Value;
      }
    })

    if (this.baseService.authenticated) {
      this.storageService.User.Roles.forEach((el: any) => {
        if (el.Role_Code === RoleCode.StudentEnglish || el.Role_Code === RoleCode.StudentArabic || el.Role_Code === RoleCode.StudentAfghan) {
          this.PageData.isNonIranian = true;
        }
      });
    }
  }

  loadDataMemberInfo() {
    this.authenticationService.Info().then((result: any) => {
      if (result) {
        this.memberData = result;
        this.storageService.User = result;
      }
    }, (err) => { })
  }

  editAvatar() {
    let buttons = [];
    if (this.memberData.ProfileImageFile) {
      buttons = [
        {
          text: this.baseService.translate('common-btn-Upload'),
          data: {
            action: 'upload',
          },
        },
        {
          text: this.baseService.translate('common-btn-delete'),
          data: {
            action: 'delete',

          },
        },
        {
          text: this.baseService.translate('common-btn-cancel'),
          data: {
            action: 'cancel',
          },
        },
      ]
    } 

    else {
      buttons = [
        {
          text: this.baseService.translate('common-btn-Upload'),
          data: {
            action: 'upload',
          },
        },
        {
          text: this.baseService.translate('common-btn-cancel'),
          data: {
            action: 'cancel',
          },
        },
      ]
    }
    this.actionSheet.create({
      header: this.baseService.translate('common-alert-header-action-delete-avatar'),
      buttons: buttons,
    }).then((c) => {
      c.present();
      c.onDidDismiss().then((res) => {
        switch (res.data.action) {
          case 'delete':
            this.baseService.confirm(
              this.memberData.FirstName + ' ' + this.memberData.LastName,
              this.baseService.translate('common-alert-header-delete-avatar'),
              this.baseService.translate('common-btn-confirm'),
              this.baseService.translate('common-btn-cancel')
            ).then((confirmResult: any) => {
              if (confirmResult) {
                this.authenticationService.ProfileImage({ ProfileImageFile: null }).then((result: any) => {
                  if (result) {
                    this.loadDataMemberInfo();
                    this.baseService.toast(this.baseService.translate('common-error-success'), 'success');
                  } else {
                    this.baseService.toast(this.baseService.translate('common-error-danger'), 'danger');
                  }
                }, (err) => { });
              }
            });
            break;
          case 'upload':
            this.upload.open().then((file: any) => {
              this.baseService.httpUploadFILE(file).then((result: any) => {
                this.authenticationService.ProfileImage({ ProfileImageFile: result.Result.FileName }).then((result: any) => {
                  if (result) {
                    this.loadDataMemberInfo();
                    this.baseService.toast(this.baseService.translate('common-error-success'), 'success');
                  } else {
                    this.baseService.toast(this.baseService.translate('common-error-danger'), 'danger');
                  }
                }, (err) => { });
              }, (err) => { });
            }, (err) => { });
            break;
        }
      })
    });
  }

  onChangePassword() {
    if (this.pageDataChangePassword.confirmNewPassword === this.pageDataChangePassword.newPassword) {
      this.authenticationService.Password(this.pageDataChangePassword.oldPassword, this.pageDataChangePassword.confirmNewPassword, this.pageDataChangePassword.newPassword).then((result: any) => {
        if (result) {
          this.onCancelChangePassword()
          this.baseService.toast(this.baseService.translate('common-error-success'), 'success');
        } else {
          this.baseService.toast(this.baseService.translate('common-error-danger'), 'danger');
        }
      }, (err) => { });
    } else {
      this.baseService.toast(this.baseService.translate('common-error-incorect-Password'), 'warning');
      this.setPasswordOpen(true);
    }

  }

  setBirthOpen(isOpen: boolean) {
    this.isBirthModalOpen = isOpen;
  }

  setPasswordOpen(isOpen: boolean) {
    this.isPasswordModalOpen = isOpen;
  }

  onCancelChangePassword() {
    this.pageDataChangePassword.oldPassword = '';
    this.pageDataChangePassword.newPassword = '';
    this.pageDataChangePassword.confirmNewPassword = '';
    this.setPasswordOpen(false);
  }

  onChangeBirthDate(event: any, memberData: any) { memberData.BirthDate = event; }

  onBirthDateSet(memberData: any) {
    let DateValueSelected: any;
    if (!this.PageData.isNonIranian) {
      DateValueSelected = moment.from(memberData.BirthDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
    } else {
      DateValueSelected = moment.from(memberData.BirthDate, 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
    }
    this.setBirthOpen(false);
    this.baseService.confirm(
      memberData.FirstName + ' ' + memberData.LastName,
      this.baseService.translate('profile-list-BirthDate-edit-popup-BirthDate-confirm').replace('{-title-}', DateValueSelected),
      this.baseService.translate('common-btn-confirm'),
      this.baseService.translate('common-btn-cancel')
    )
      .then((confirmResult: any) => {
        if (confirmResult) {
          this.authenticationService.Profileinfo({ BirthDate: memberData.BirthDate })
            .then((result: any) => {
              if (result) {
                this.baseService.toast(this.baseService.translate('common-error-success'), 'success');
                this.loadDataMemberInfo();
              } else {
                this.baseService.toast(this.baseService.translate('common-error-danger'), 'danger');
              }
            });
        }
      });
  }

  onEmailSet(memberData: any) {
    this.baseService.inputConfirm(
      this.baseService.translate('common-alert-user'),
      memberData.FirstName + ' ' + memberData.LastName,
      this.baseService.translate('profile-list-Email-edit-popup-Email'),
      '', //default value
      this.baseService.translate('profile-list-edit-popup-btn'),
      this.baseService.translate('common-btn-cancel')
    )
      .then((inputResult: any) => {
        if ((inputResult) && (inputResult.submit)) {

          if (!this.baseService.isValidEmail(inputResult.value)) {
            this.baseService.toast(this.baseService.translate('profile-inputs-InvalidEmail'));
          }

          else {
            this.baseService.confirm(
              memberData.FirstName + ' ' + memberData.LastName,
              this.baseService.translate('profile-list-Email-edit-popup-Email-confirm').replace('{-title-}', inputResult.value),
              this.baseService.translate('common-btn-confirm'),
              this.baseService.translate('common-btn-cancel')
            )
              .then((confirmResult: any) => {
                if (confirmResult) {
                  this.authenticationService.Profileinfo({ Email: inputResult.value })
                    .then((result: any) => {
                      if (result) {
                        this.loadDataMemberInfo();
                        this.baseService.toast(this.baseService.translate('common-error-success'), 'success');
                      } else {
                        this.baseService.toast(this.baseService.translate('common-error-danger'), 'danger');
                      }
                    });
                }
              });
          }
        }
      });
  }

}

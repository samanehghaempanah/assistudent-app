import { HttpEventType } from '@angular/common/http';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import {
  UploadConfig,
  UploadInputParams,
  UploadResponse,
} from 'src/app/definitions/models/upload.model';
import { BaseService } from 'src/app/services/base.service';
import { FileUploaderService } from 'src/app/services/file-uploader.service';
import { environment } from 'src/environments/environment';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { FieldType } from 'src/app/definitions/models/DataTypes.model';

@Component({
  selector: 'apv-file-uploader',
  templateUrl: 'file-uploader.component.html',
  styleUrls: ['file-uploader.component.scss'],
})
export class FileUploaderComponent implements OnInit, OnDestroy {
  @ViewChild('fileUpload') private fileInput: ElementRef;

  // excel,word,audio
  @Input() public accept: FieldType = 21
  @Input() public minSize: number = 0
  @Input() public maxSize: number = 0
  @Input() public isValidation: boolean = false;
  @Input() public config: UploadConfig = {
  apiUrl: environment.apiUrl,
    endpoint: 'File',
    fileName: this.baseService.translate('common-no-file-upload')
  };
  @Input() public isDisabled: boolean = false;
  @Input() public showLoading: boolean = false;
  @Input() public src: string | null = null;
  @Output() public statusChange = new EventEmitter<boolean>();
  @Output() public responseChange = new EventEmitter<any>();
  @Output() public sizeValidation = new EventEmitter<any>();

  private fileTypes: { accept: string[], filedType: FieldType }[] = [
    {
      accept: ['image/gif', 'image/jpeg', 'image/png'],
      filedType: 21
    },
    {
      accept: ['application/pdf'],
      filedType: 22
    },
    {
      accept: [],
      filedType: 20
    },
    {
      accept: ['video/*'],
      filedType: 23
    },
  ];

  public isMobileScreen: boolean = false
  public response: Partial<UploadResponse>;
  public uploadSub: Subscription | null;
  public uploadPrecentage: number;
  public currentUploadedFiles =
    this._fileUploaderService.uploadedFiles$.getValue();
  public constructor(
    private _fileUploaderService: FileUploaderService,
    private _modalCtrl: ModalController,
    public baseService: BaseService
  ) { }

  public ngOnInit(): void {
    // this.checkMobileBreakPoint()
  }

  // private checkMobileBreakPoint(){
  //   if (window.screen.width <= 480) { // 768px portrait
  //     this.isMobileScreen = true;
  //   }
  // }

  public ngOnDestroy(): void {
    this.unsubscribeFromObserveUpload()
  }

  private unsubscribeFromObserveUpload() {
    if (this._fileUploaderService.uploadedFiles$.getValue().length > 0) {
      this._fileUploaderService.uploadedFiles$.next([])
      this.resetUploadInput()
    }
  }

  public onFileSelected(e: any) {
    if (this.isValidation) {
      if (e.target.files[0].size >= (this.minSize * 1000) && e.target.files[0].size <= (this.maxSize * 1000)) {
        let file: File = e.target.files[0];
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          if (this.config.fileName) {
            formData.append('FileName', file.name.substring(file.name.lastIndexOf("/") + 1, file.name.lastIndexOf(".")) || this.config.fileName);
          }
          if (this.config.fileInfo) {
            formData.append('FileInfo', this.config.fileInfo);
          }
          if (this.config.isThumnail !== undefined) {
            formData.append('IsThumnail', this.config.isThumnail as any);
          }

          switch (this.accept) {
            case 20:
              formData.append('FileType', "3");
              break;
            case 21:
              formData.append('FileType', "1");
              break
            case 23:
              formData.append('FileType', "2");
              break
            default:
              formData.append('FileType', "0");
              break;
          }

          this.handleUpload({
            apiUrl: this.config.apiUrl,
            endpoint: this.config.endpoint,
            formData,
            id: this?.response?.Result?.Id,
          } as UploadInputParams);
        }
      } else {
        if (e.target.files[0].size < (this.minSize * 1000)) { this.sizeValidation.emit("minSize"); }
        if (e.target.files[0].size > (this.maxSize * 1000)) { this.sizeValidation.emit("maxSize"); }
      }
    }

    else {
      let file: File = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        if (this.config.fileName) {
          formData.append('FileName', file.name.substring(file.name.lastIndexOf("/") + 1, file.name.lastIndexOf(".")) || this.config.fileName);
        }
        if (this.config.fileInfo) {
          formData.append('FileInfo', this.config.fileInfo);
        }
        if (this.config.isThumnail !== undefined) {
          formData.append('IsThumnail', this.config.isThumnail as any);
        }

        switch (this.accept) {
          case 20:
            formData.append('FileType', "3");
            break;
          case 21:
            formData.append('FileType', "1");
            break
          case 23:
            formData.append('FileType', "2");
            break
          default:
            formData.append('FileType', "0");
            break;
        }

        this.handleUpload({
          apiUrl: this.config.apiUrl,
          endpoint: this.config.endpoint,
          formData,
          id: this?.response?.Result?.Id,
        } as UploadInputParams);
      }
    }
  }

  async uploadImage(files) {
    if (files.length == 0 && this.product.id)
        return;
    this.uploadLoading = true;
    var formData = new window.FormData();
    formData.append("imageFile", files[0]);
    formData.append('model', JSON.stringify(this.$scope.angularModel));

    var result = await this.httpHelperService.post<any>(this.apiBaseUrl + "raw-products/" + this.product.id + "/picture", formData, {
        'Content-Type': undefined
    });
    this.$mdToast.showSimple(result.message);
    this.uploadLoading = false;
    if (result.isSuccess) {
        this.product.image = result.data;
        this.$scope.$apply();
    }
}

  private handleUpload({ apiUrl, endpoint, formData, id }: UploadInputParams) {
    this.initLoading()
    this.isDisabled = true
    if (id) {
      this.uploadSub.unsubscribe();
      this.resetUploadInput();
    }
    this.uploadSub = this._fileUploaderService
      .observeUpload({ apiUrl, endpoint, formData, id })
      .subscribe((event: any) => {
        if (event.ok && event.type == HttpEventType.Response) {
          this.statusChange.emit(event.ok);
        }
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadPrecentage = Math.round(
            100 * (event.loaded / event.total)
          );
        }
        if (event.type == HttpEventType.Response) {
          this.response = event.body;
          if (this.response.Result) {
            this.src = this.response.Result.FileURL;
            this.config.fileName = this.response.Result.FileName
            this.currentUploadedFiles.push(this.response.Result.Id);
            this._fileUploaderService.uploadedFiles$.next(
              this.currentUploadedFiles
            );
            this.response.Result.uploadedFiles = this.currentUploadedFiles;
            this.responseChange.emit(this.response.Result);
            this.isDisabled = false
            // this.baseService.loadingCtrl.dismiss()
          }
        }
      });
  }

  public async cancelUpload() {
    if (!this.isDisabled && this?.response?.Result?.Id) {
      await this.baseService
        .httpDELETE(`${this.config.endpoint}/${this.response.Result.Id}`, true)
        .then((res) => {
          this.currentUploadedFiles = this.currentUploadedFiles.filter(el => el !== this.response.Result.Id)
          this._fileUploaderService.uploadedFiles$.next(this.currentUploadedFiles);
          this.uploadSub.unsubscribe();
          this.resetUploadInput();
          this.config.fileName = this.baseService.translate('common-no-file-upload')
        });
    } else {
      this.isDisabled = false
      this.uploadSub.unsubscribe();
      this.resetUploadInput();
    }
  }

  private resetUploadInput() {
    this.response = {}
    this.src = null;
    this.config.fileName = null;
    this.fileInput.nativeElement.value = '';
    this.uploadSub = null;
    this.uploadPrecentage = 0;
  }

  public get acceptTypes(): string[] {
    return this.fileTypes.find((item) => item.filedType == this.accept).accept;
  }

  private async initLoading() {
    if (this.showLoading) {
      this.baseService.loading_Show(this.baseService.translate('common-processing'))
    }
  }

  public async onShowImage() {
    this.baseService.loadImage
    const modal = await this._modalCtrl.create({
      component: ImageViewerComponent,
      componentProps: { imgSrc: this.response?.Result?.FileURL || this.src },
    });
    modal.present();
  }

  public downloadFile() {
    if (this.response?.Result?.FileURL || this.src) {
      this.baseService.openLink(this?.response?.Result?.FileURL || this.src)
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { UploadInputParams, UploadResponse } from '../definitions/models/upload.model';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class FileUploaderService {
  public uploadedFiles$:BehaviorSubject<number[]> = new BehaviorSubject([])
  public constructor(private _http: HttpClient,private _baseService:BaseService) {}

  public observeUpload({ apiUrl, endpoint, formData,id }: UploadInputParams) {
    if(id){
      return this._http
      .put(`${apiUrl}${endpoint}/${id}`, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(finalize(() => {}));
    }else{
      return this._http
      .post(apiUrl + endpoint, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(finalize(() => {}));
    }
  }

  public accceptFiles(): Promise<any> {
    return new Promise((resolve, reject) => {
      const promises = this.uploadedFiles$.getValue().map((id) => {
        return this._baseService.httpPOST(`File/accept/?id=${id}`, {}, true);
      });
      Promise.all(promises).then(() => {
        resolve(true);
      }).catch((error) => {
        reject(error);
      });
    });
  }

}

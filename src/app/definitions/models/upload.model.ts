export interface UploadConfig {
  fileName?: string;
  isThumnail?: boolean;
  apiUrl: string;
  endpoint: string;
  fileInfo?: string;
}

export interface UploadResponseChangeEvent {
  File: File | null;
  FileInfo: string;
  FileName: string;
  IsThumnail: boolean;
}

export interface UploadResponse {
  Result?: {
    IsThumnail: boolean;
    FileType_Title: string;
    FileInfo: any;
    FileSize: number;
    SubmitFlag: boolean;
    File: any;
    Id: number;
    FileName: string;
    FileURL: string;
    FileType: number;
    Date: string;
    uploadedFiles?: number[];
  };
  ExceptionCode: number;
  ExceptionMessage: string | null;
}

export interface UploadInputParams {
  apiUrl: string;
  endpoint: string;
  formData: FormData;
  id: number | null;
}

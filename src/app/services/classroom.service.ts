import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { FilteringModel } from '../definitions/models/Common.model';

let preUrl = 'Course';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(public baseService: BaseService) { }

  async StudentInfo_GET() {
    try {
      const result: any = await this.baseService.httpGET(preUrl + '/studentInfo', true);

      return result;
    } catch { }
  }

  async Semester_Get(studentinfoid: number) {
    try {
      const result: any = await this.baseService.httpGET(preUrl + '/Semester/' + studentinfoid, true);

      return result;
    } catch { }
  }

  async Course_Get(studentid: number, semesterid: number) {
    try {
      const result: any = await this.baseService.httpGET(preUrl + '/' + studentid + '/' + semesterid, true);

      return result;
    } catch { }
  }

  async GET(filteringModel: FilteringModel = null) {
    try {
      const result: any = await this.baseService.httpGET(preUrl, filteringModel, true);

      return result;
    } catch { }
  }

  async Get(id: number) {
    try {
      const result: any = await this.baseService.httpGET(preUrl + '/' + id, true);

      return result;
    } catch { }
  }




  // OLD METHOD MYUNI
  TeacherCourses() {
    return new Promise(async (resolve, reject) => {
      // query.Code = 'TeacherCourses';
      // this.baseService.httpQuery(query, true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }

  TeacherRecords() {
    return new Promise(async (resolve, reject) => {
      // query.Code = 'TeacherRecords';
      // this.baseService.httpQuery(query, true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }

  StudentCourses() {
    return new Promise(async (resolve, reject) => {
      // query.Code = 'StudentCourses';
      // this.baseService.httpQuery(query, true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
    });
  }

  EducationalRecords() {
    return new Promise(async (resolve, reject) => {
      // query.Code = 'EducationalRecords';
      // this.baseService.httpQuery(query, true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
      resolve({
        items:
          [
            {
              Id: 1,
              Term: this.baseService.translate('classroom-history-card-title-term1'),
              Status: this.baseService.translate('classroom-history-card-title-status1'),
              Active: false,
              Fields: [{
                LessonTitle: this.baseService.translate('classroom-history-card-lesson-title'),
                LessonCode: 123,
                PresentationCode: 123456789,
                TeacherName: this.baseService.translate('classroom-program-card1-teacher-name'),
                ClassDate: '',
                ClassTime: '',
                ExamDate: '',
                ExamTime: '',
                Location: ''
              }]
            },
            {
              Id: 2,
              Term: this.baseService.translate('classroom-history-card-title-term2'),
              Status: this.baseService.translate('classroom-history-card-title-status2'),
              Active: true,
              Fields: [{
                LessonTitle: this.baseService.translate('classroom-history-card-lesson-title'),
                LessonCode: 123,
                PresentationCode: 123456789,
                TeacherName: this.baseService.translate('classroom-program-card1-teacher-name'),
                ClassDate: this.baseService.translate('classroom-program-date'),
                ClassTime: '11 - 8/5',
                ExamDate: this.baseService.translate('classroom-program-date'),
                ExamTime: '11 - 8/5',
                Location: this.baseService.translate('classroom-history-card-address'),
              }]
            },
            {
              Id: 3,
              Term: this.baseService.translate('classroom-history-card-title-term3'),
              Status: '',
              Fields: []
            },
            {
              Id: 4,
              Term: this.baseService.translate('classroom-history-card-title-term4'),
              Status: '',
              Fields: []
            },
          ]
      });
    });
  }


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoleCode } from 'src/app/definitions/models/DataTypes.model';
import { BaseService } from 'src/app/services/base.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { CoreService } from 'src/app/services/core.service';
import { StorageService } from 'src/app/services/storage.service';

interface Course {
  Id: number;
  Course_Code: string;
  Lesson_Id: number;
  Lesson_Code: string;
  LessonTitle: string;
  Teacher_Id: number;
  TeacherFirstName: string;
  TeacherLastName: string;
  ExamDate: string;
  ExamPlace_Id: number;
  ExamPlace_Title: string;
  ScheduleList: [
    {
      Day_Id: number;
      Day_Title: string;
      Class_Id: number;
      Class_Title: string;
      StartTime: string;
      StartTime_short: string;
      EndTime: string;
      EndTime_short: string;
      Longitude: number;
      Latitude: number;
    }
  ];
}

interface Item {
  Course: Course;
  Day_Id: number;
  Day_Title: string;
}

interface CourseByDay {
  Day_Title: string;
  Day_Id: number;
  Courses: Course[];
}

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.page.html',
  styleUrls: ['./classroom.page.scss'],
})

export class ClassroomPage implements OnInit {
  Categories: any[] = [];
  StudentInfo: any;
  SemesterList: any[] = [];
  coursesByDay: CourseByDay[] = [];
  courseDay: any[] = [];
  historys: any[] = [];
  selectedTab: any = 'program';


  constructor(public baseService: BaseService,
    public storageService: StorageService,
    public classroomService: ClassroomService,
    public coreService: CoreService) { }

  ngOnInit() {
    this.storageService.User.Roles.forEach((el: any) => {
      switch (el.Role_Code) {
        case RoleCode.Teacher:
          this.Categories = [{
            value: 'program-teacher',
            title: this.baseService.translate('classroom-teacherpage-program'),
            actionUrl: '',
          },
          {
            value: 'history-teacher',
            title: this.baseService.translate('classroom-teacherpage-history'),
            actionUrl: '',
          }];
          break;
        case RoleCode.StudentFarsi || RoleCode.StudentEnglish || RoleCode.StudentArabic || RoleCode.StudentAfghan:
          this.Categories.push({
            value: 'program',
            title: this.baseService.translate('classroom-studentpage-program'),
            actionUrl: '',
          },
            {
              value: 'history',
              title: this.baseService.translate('classroom-studentpage-history'),
              actionUrl: '',
            });
          break;
      }
    });
    // this.selectedTab = null;

    this.loadDate();
  }

  async loadDate() {
    try {
      let StudentInfoResult: any = await this.classroomService.StudentInfo_GET();
      if (StudentInfoResult) {
        this.StudentInfo = StudentInfoResult.Items[0];
      };

      switch (this.selectedTab) {
        case 'program':
          let ProgramResult = await this.classroomService.GET();
          if (ProgramResult) {
            const coursesByDay: { [dayId: number]: CourseByDay } = {};
            ProgramResult.Items.reduce((accumulator: any, item: any) => {
              const { Day_Id, Day_Title, Course } = item;
              if (!accumulator[Day_Id]) {
                accumulator[Day_Id] = { Day_Id, Day_Title, Courses: [Course] };
              } else {
                accumulator[Day_Id].Courses.push(Course);
              }
              return accumulator;
            }, coursesByDay);

            this.coursesByDay = Object.values(coursesByDay);

            console.log(this.coursesByDay);

          }
          break;
        case 'history':
          let SemesterResult = await this.classroomService.Semester_Get(this.StudentInfo.Id);
          if (SemesterResult) {
            this.SemesterList = SemesterResult.Items;
          }
          break;
      }
    } catch { }

  }


  async onLoadDataCoursHistory(item: any) {
    this.historys = [];
    try {
      let HistoryResult = await this.classroomService.Course_Get(this.StudentInfo.Id, item.Id);
      if (HistoryResult) {
        this.historys = HistoryResult.Items;
      }
    } catch { }
  }

  onTabClick(event: any) {
    this.selectedTab = event.value;
    this.loadDate();
  }

  onMap(item: any) {
    let mapUrl = 'https://maps.google.com/' + '?' + 'q' + '=' + item.Latitude + ',' + item.Longitude;
    window.open(mapUrl, '_system');
  }

  onMapExam(item: any) {
    let mapUrl = 'https://maps.google.com/' + '?' + 'q' + '=' + item.ExamPlace_Latitude + ',' + item.ExamPlace_Longitude;
    window.open(mapUrl, '_system');
  }
}

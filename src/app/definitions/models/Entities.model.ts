import { MenuType } from "./DataTypes.model";

export class DataListModel {
  'CurrentPage': number;
  'TotalPages': number;
  'PageSize': number;
  'TotalCount': number;
  'HasPrevious': boolean;
  'HasNext': boolean;
  'Items': any[];
}

export class NotificationModel {
  'Id': number;
  'Title': string;
  'CommentCount': number;
  'Description': string;
  'fileType': any;
  'MainFile': string;
  'Link': string;
  'StartDate': any;
  'liked': boolean;
  'saved': boolean;
  'ViewCount': number;
  'LikeCount': number;
  'SaveCount': number;
  'Category_Title': string;
}

export class FormValuesModel {
  'Data': any;
  'fieldType': string;
  'formFieldId': number;
  'id': number;
  'overall_count': number;
  'sequence': number;
  'title': string;
  'value': any;
}

export class ListMenuOptionModel {
  'Icon': string;
  'Title': string;
  'MenuType': MenuType;
  'URL': string;
  'Disable': boolean;
}

export class RadioListOptionModal {
  "Sequence": number;
  "Required": boolean;
  "PossibleValue": RadioOptionModel[];
  "DefaultValue": RadioOptionModel[];
  "Description": string;
  "Validation": null | any;
  "Form_Id": number;
  "UserForm_Id": number;
  "Id": number;
  "Title": string;
  "FieldType": number;
  "FieldType_Title": string;
  "UserField_Id": number;
  "Value": number;
}

export class RadioOptionModel {
  "Key": string;
  "Value": string;
} [] = [];

export interface NewCard {
  type: string;
  desc: string;
}

export class StationModel {
  "Id": number;
  "User_Id": number;
  "Client_Id": string;
  "User_FirstName": string;
  "User_LastName": string;
  "DepartureStation_Id": number;
  "DepartureStation_Title": string;
  "DepartureTime_Id": number;
  "DepartureTime": string;
  "DestinationStation_Id": number;
  "DestinationStation_Title": string;
  "DestinationTime_Id": number;
  "DestinationTime": string;
  "Day_Id": number;
  "Day_Title": string;
  "RelatedNumber": number;
  "Semester_Id": number;
} [] = []

export class AddressModel {
  "Id": number;
  "User_Id": number;
  "Address": string;
  "AddressType": number;
  "AddressType_Title": string;
  "PostalCode": string;
  "Province_Id": number;
  "Province_Title": string;
  "City_Id": number;
  "City_Title": string;
}

export class StationStartTimeModel {
  "Id": number;
  "MoveDateTime": string;
  "MoveTime": string;
  "MoveDate": string;
  "Side": string;
}

export class StudentCardModel {
  "StudentNo": string;
  "CardOrderType": number;
  "CardOrderType_Title": string;
  "Redirect_Url": string;
}

export class PaymentModel {
  "PaymentKey": string;
  "Status": number;
  "Status_Title": string;
  "PaymentType": number;
  "Amount": number;
  "Redirect_Url": string;
  "ReferenceNo": string;
}

export class RegisterModel {
  "Client_Id": string;
  "RegistrationStep": number;
  "Questions": [
    {
      "Question": string,
      "Options": [
        string
      ],
      "Answer": string
    }
  ];
  "UserData": UserDataModel;
  "ConfirmCode": string;
  "ExpireDate": string
}

export class UserDataModel {
  "FirstName": string;
  "LastName": string;
  "PhoneNo": string;
  "NationalCode": string;
  "StudentNo": string;
  "BirthDate": string;
  "Email": string;
  "Username": string;
  "Password": string;
  "ConfirmPassword": string;
  "Role_Id": number;
  "Country_Id": number;
  "Gender_Id": number;
  "OriginalLanguage_Id": number;
}

export class MajorDataModel {
  "Id": number;
  "Title": string;
  "Tuition_Data": TuitionDataModel[];
}

export class TuitionDataModel {
  "Id": number;
  "Degree": string;
  "Tuition": number;
}

export class BookletDataModel {
  "Id": number;
  "UserBooklet_Id": number;
  "Mine": boolean;
  "Title": string;
  "Lesson_Title": string;
  "BookletFile": any;
  "CurriculumFile": string;
  "Price": number;
  "Teacher_Id": number;
  "Teacher_FirstName": string;
  "Teacher_LastName": string;
  "Owner_Id": number;
  "Owner_FirstName": string;
  "Owner_LastName": string;
  "SaleCount": number;
  "Description": string;
  "CoverImageFile": string;
  "CreationDate": string;
  "Majors": MajorsDataModel[] = [];
}

export class MajorsDataModel {
  "Id": number;
  "Booklet_Id": number;
  "Major_Id": number;
  "Major_Title": string;
  "Major_Code": string;
  "Grade_Id": number;
  "Grade_Title": string;
  "EducationalGroup_Id": number;
  "EducationalGroup_Title": string;
}

export class UserBookletDataModel {
  "Id": number;
  "User_ClientId": string;
  "User_FirstName": string;
  "User_LastName": string;
  "Booklet_Id": number;
  "Booklet_Title": string;
  "Booklet_CoverImageFile": string;
  "Booklet_Lesson_Title": string;
  "Booklet_Teacher_Id": number;
  "Booklet_Teacher_FirstName": string;
  "Booklet_Teacher_LastName": string;
  "BookletPrice": number;
  "CreateDate": string;
  "Booklet": {
    "Id": number;
    "Title": string;
    "Lesson_Title": string;
    "CoverImageFile": string;
    "Price": number;
    "SaleCount": number;
    "CreationDate": string;
    "Teacher_Id": number;
    "Teacher_FirstName": string;
    "Teacher_LastName": string;
    "Owner_FirstName": string;
    "Owner_LastName": string;
  }
}
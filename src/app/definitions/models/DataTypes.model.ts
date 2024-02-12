
export enum FormStatus {
  Draft = 0,
  Submit = 1,
  Inprogress = 2,
  Reject = 3,
  Accept = 4
}
export enum FormType {
  Unknown = 0,
  Visa = 1,
  Offer = 2,
  SingleRequest = 3,
  MultipleRequest = 4
}
export enum MenuType {
  InnerLink = 0,
  OuterLink = 1,
  IFrame = 2,
}
export enum FieldType {
  Unknown = 0,
  Label = 1,
  H1 = 2,
  H2 = 3,
  H3 = 4,
  P = 5,
  Line = 6,
  Hidden = 7,
  Image = 8,
  FileUploader = 20,
  ImageUploader = 21,
  PdfUploader = 22,
  videoUploader = 23,
  TextInput = 30,
  TextareaInput = 31,
  DateInput = 32,
  TimeInput = 33,
  DateTimeInput = 34,
  PasswordInput = 35,
  NumberInput = 36,
  EmailInput = 37,
  TellInput = 38,
  MobileInput = 39,
  UrlInput = 40,
  AddressComponent = 80,
  RangeComponent = 81,
  SelectComponent = 82,
  ListComponent = 83,
  RadioComponent = 84,
  CheckComponent = 85,
  ButtonComponent = 86,
  LinkComponent = 87,
  Like = 100,
  Save = 101,
  Comment = 102,
  View = 103,
  UseGPS = 300,
}

export enum filteringOperationType {
  Equal = 1,
  NotEqual = 2,
  GreaterThan = 3,
  GreaterThanOrEqual = 4,
  LessThan = 5,
  LessThanOrEqual = 6,
  StartWith = 9,
  Contain = 10,
}
export enum filteringOrderType {
  Ascending = 0,
  Descending = 1,
}

export enum StudentCardType {
  NewCard = 1,
  Duplicate = 2,
  Again = 3,
}

export enum RegisterStepType {
  Signup = -1,
  NewUser = 0,
  SetPassword = 1,
  Question = 2,
  Submit = 5
}

export enum PaymentType {
  IssuanceOfStudentCard = 1,
  VisaApplication = 3,
  ResidenceRequest = 4,
  ExtensionOfStay = 5,
  RequestComprehensiveCode = 6,
  RequestAccommodation = 7,
  ExitAndReturn = 8,
  FinalExit = 9,
  BuyBook = 10,
  BuyBooklet = 11,
  RechargeWallet = 12,
  Facility = 13,
  Translate = 14
}

export enum PaymentStatus {
  Unknown = 0,
  StartPaymentTransaction = 1,
  Successfull = 2,
  Failed = 3,
  Repetitious = 4,
  Waiting = 5
}

export enum RoleCode {
  Admin = 'admin',
  Company = 'company',
  Teacher = 'professor',
  StudentFarsi = 'studentfarsi',
  StudentEnglish = 'studentenglish',
  StudentArabic = 'studentarabic',
  StudentAfghan = 'studentafghan',
  Family = 'family',
  InternationalAdmin = 'internationaladmin',
  ConsularAffairsOfficer = 'consularaffairsofficer',
  Employee = 'employee',
}

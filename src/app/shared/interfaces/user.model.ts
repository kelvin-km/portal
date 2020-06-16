export class User  {
  id: number;
  firstName: string;
  surname: string;
  middleName: string;
  username: string;
  emailAddress: string;
  phoneNumber: string;
  nationalID: number;
  roleID: number;
  imageUrl: string;
  image: any;
  password: string;
  createdBy: number;
  verification: number;
  modifiedBy: number;
  isActive: boolean;
  createdDate: Date;
  modifiedDate: Date;
  constructor() {
}
}

export class Ivictim {
  id: number;
  firstName: string;
  surname: string;
  lastName: string;
  dob: Date;
  phone: string;
  age: number;
  status: number;
  countryofBirth: string;
  location: string;
  infectionMode: string;
  infectionmodeid: number;
  colors: string;
  violations: number;
  latitude: string;
  longitude: string;
  gender: string;
  image: any;
  nationalId: any;
  imageUrl: string;
  createdDate: Date;
  metPeople: string;
  changedJobs: string;
  deviceLongitude: string;
  deviceLatitude: string;
  difficultInBreathing: string;
  temparatureChange: string;
  temparatureAbove38: string;
  chatStatus: number;
  constructor() {
  }
}
export interface IvictimLocation {
  id: number;
  distance: string;
  victimId: number;
  status: number;
  latitude: string;
  longitude: string;
  color: string;
  createdDate: Date;
}
export class IChat {
  id: number;
  chatMessage: string;
  victimID: number;
  customerCareId: number;
  createdDate: Date;
  status: number;
  constructor() {
  }
}
export class ICUSTOMERCARE {
  victimid: number;
  chatreply: string;
  userid: number;
  status: number;
  constructor() {
  }
}

export class IvictimFeatures {
  id: number;
  victimId: number;
  metPeople: string;
  changedJobs: string;
  peopleInteractedWith: any[];
  difficultInBreathing: string;
  temparatureAbove38: string;
  temparatureChange: string;
  deviceLongitude: string;
  deviceLatitude: string;
  createdDate: Date;
  constructor() {
}
}











export class Ipassword  {
  old_password: string;
  new_password: string;
  confirm_password: string;
  constructor() {
  }
}
export class IInfectionMode  {
  id: number;
  infectionMode: string;
  colors: string;
  constructor() {
  }
}

export class  IUser {
  phoneNumber: string;
  fullName: string;
  nationalID: number;
  bizlocation: string;
  bizname: string;
  location: string;
  walletBalance: number;
  createdAt: Date;
  id: number;
  constructor() {
  }
}
export class Roles  {
  id: number;
  name: string;
  permissions: Array<Permission>;
  constructor() {
  }
}
export class Permission  {
  id: number;
  name: string;
  content_type_id: number;
  codename: string;
  status: boolean;
  constructor() {
  }
}
export interface Tkn  {
  token?: string;
}
export class MohnitoSummarry  {
  usertotalcount: number;
  violationCount: number;
  contactCount: number;
  victimCount: number;
  constructor() {
}
}
export class MohnitorGenderSummarry  {
  gender: string;
  total: number;
  constructor() {
}
}
export class InvoiceSummary  {
  day: number;
  ordercount: number;
  constructor() {
}
}
export class TopMohnitorContactsSummary  {
  firstName: string;
  surname: string;
  victimId: number;
  total: number;
  constructor() {
}
}
export class OrderSummarry  {
  cancelled: number;
  confirmed: number;
  paid: number;
  deliverd: number;
  pending: number;
  constructor() {
}
}
export class IAgencyInfo {
  id: number;
  name: string;
  email: string;
  officelocation: string;
  phone: string;
  category: number;
  createdAt: Date;
  apikey: string;
  image: any;
  imageUrl: string;
  status: number;
  constructor() {
  }
}
export class IFeeds {
  id: number;
  image: any;
  categoryID: number;
  title: string;
  article: string;
  status: number;
  thumb: string;
  link: string;
  countyids: any;
  countids: Array<string> = new Array<string>();
  citizenids: Array<string> = new Array<string>();
  allcitizen: number;
  categoryname: any;
  createdDate: any;
  constructor() {
  }
}

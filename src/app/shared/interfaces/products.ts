export class IProduct  {
id: number;
code: string;
name: string;
description: string;
price: number
minimumQTy: number;
status: number;
  constructor() {
  }
}
export class IMportProduct  {
  code: string;
  name: string;
  description: string;
  price: number;
  minimum_qty: number;
  status: number;
  constructor() {
  }
}
export class IMpesaConfirmation {
  TransactionType: string;
  TransID: string;
  TransTime: string;
  TransAmount: number;
  BusinessShortCode: string;
  BillRefNumber: string;
  InvoiceNumber: string;
  OrgAccountBalance:number;
  ThirdPartyTransID: string;
  MSISDN: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  createdAt: Date;
  constructor() {
  }
}
export class  IUserOrder {
  productID: number;
  productCode: string;
  quantity: number;
  description: string;
  total: number;
  userID: number;
  createdAt: Date;
  id: number;
  sessionid: string;
  status: number;
  name: string;
  price: number;
  constructor() {
  }
}
export class  IOrderGroup {
fullName: string;
sessionid: string;
total: number;
count: number;
  status: number;
  constructor() {
  }
}
export class  StkRequest {
  invoice: string;
  fullname: string;
  phone: string;
  amount: number;
  constructor() {
  }
}
export class  IPay {
  balance: number;
  id: number;
  invoice: string;
  userid: number;
  amountpaid: number;
  constructor() {
  }
}
export class Ivoice {
  id: number;
  invoice: string;
  sessionid: string;
  fullName: string;
  placeName: string;
  status: number;
  totalCost: number;
  amountPaid: number;
  userid: number;
  productCount: number;
  phoneNumber: string;
  points: string;
  bizname: string;
  createdDate: Date;
  constructor() {
  }
}

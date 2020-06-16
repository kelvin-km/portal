export class IProjects  {
  id: number;
  name: string;
  project_code: string;
  start_date: Date;
  numbering_system: string;
  contact_person: string;
  contact_phone_no: string;
  contact_email: string;
  notes: string;
  connection_strings: string;
  project_authority: any;
  county: any;
  wards: any;
  user_id: number;
  project_title:string;
  address_format:number;
  contact_phone_no_2:string;

  constructor() {
  }
}
export class ILog  {
  id: number;
  file: string;
  ward_id: number;
  timestamp: Date;
  ward_name: string;
  username: string;
  user_id: number;
  constructor() {
  }
}

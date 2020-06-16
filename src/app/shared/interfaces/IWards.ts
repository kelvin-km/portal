export class Link  {
  next: string;
  previous: string;
  constructor() {
  }
}
export class WardData<T> {
  count: number;
  page_size: number;
  results: Array<T> = new Array<T>();
  links: Array<Link> = new Array<Link>();
}
export class Ward  {
  id: number;
  county_name: string;
  ward_code: string;
  ward_name: string;
  ward_begin_lifespan: Date;
  ward_end_lifespan: Date;
  ward_valid_from: Date;
  ward_valid_to: Date;
  ward_lifecyclestage: any;
  user: number;
  county: number;
  constructor() {
  }
}
export class  IDelivery {
  id: number;
  delivery: number;
  constructor() {
  }
}
export class  Ilocation {
  id: number;
  placeName: string;
  location: string;
  constructor() {
  }
}
export class  IGeneric {
  code: string;
  id: number;
  status: string;
  constructor() {
  }
}
export class County  {
  id: number;
  country_name: string;
  county_code: string;
  county_name: string;
  county_begin_lifespan: Date;
  county_end_lifespan: Date;
  county_valid_from: Date;
  county_valid_to: Date;
  county_lifecyclestage: any;
  user: number;
  country: number;
  constructor() {
  }
}
export class Properties  {
  id: string;
  addroad_id: string;
  addroad_no: number;
  addroad_length: string;
  addroad_name:string;
  addroad_class: string;
  addroad_code: string;
  addroad_start: Date;
  addroad_end: Date;
  addroad_orientation: string;
  addroad_hierarchy: string;
  addlocality_code:string;
  addlocality_name: string;
  addroad_begin_lifespan: Date;
  addroad_end_lifespan: Date;
  addroad_validfrom: Date;
  addroad_validto: Date;
  user: number;
  ward: number;
  constructor() {
  }
}
export class AddressProperties  {
  addcomp_description: string;
  addspecification: string;
  addcomp_begin_lifespan:Date;
  addcomp_end_lifespan: Date;
  addcomp_valid_from:Date;
  addcomp_valid_to: Date;
  addcomp_lifecycle_stage: string
  user: number;
  addressmaster: number;
  id: number;
  constructor() {
  }
}
export class Features  {
  id: number;
  type: string;
  geometry: any;
  bbox: any;
  properties: Properties = new Properties();
  constructor() {
  }
}
export class AddressFeatures  {
  id: number;
  type: string;
  geometry: any;
  bbox: any;
  properties: AddressProperties = new AddressProperties();
  constructor() {
  }
}


export class Parcels  {
  id: number;
  addparcel_no: string;
  addparcel_area: number
  addparcel_reqsec: string;
  addparcel_boundary_type: string;
  addparcel_refdoc: any
  addressable_object_id: number
  addressable_object_type: any
  address_component_type: any
  addparcel_lifecycle_stage: string
  addparcel_provenance: any
  addparcel_beginlife_span: Date;
  addparcel_endlife_span: Date;
  addparcel_valid_from: Date;
  addparcel_valid_to: Date;
  user: number;
  ward: number;
  addressableobjects: number
  constructor() {
  }
}

// call options
export interface ContactCallRsp {
  title: string;
  phone: string;
  time: string;
}

// office
export interface RegionalOfficeRsp {
  title: string;
  workRange: string;
  workDate: string;
  tip: string;
  address: string;
  addressLine1: string;
  addressLine2: string;
  mapUrl: string;
}

export interface FAQRsp {
  name: string;
  label: string;
  q: string;
  description: string;
  contents?: string[];
}

export interface HelpRsp {
  call: ContactCallRsp[];
  offices: RegionalOfficeRsp[];
  FAQ: FAQRsp[];
}

export interface Chantier {
  id: number;
  site: {
    name: string;
  };
  sharedFor: any[];
  address: {
    city: string;
    postalCode: string;
  };
  archived: boolean;
  module: 'DT' | 'DICT' | 'DT-DICT';
  reference: string;
  createDate: string;
  startDate: string;
  duration: number;
  alertes: string;
  centerGeometry: string;
  areaGeometry: string;
  properties: any[];
  notices: any[];
  status: 'nouveau' | 'en traitement' | 'prêt';
}

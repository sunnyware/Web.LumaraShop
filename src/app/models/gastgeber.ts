export class Gastgeber {
  IDObj: string;
  DOIDPersonalakte: number;
  PersonalakteID: number;
  Vorname: string;
  Nachname: string;
  Strasse: string;
  PLZ: string;
  Ort: string;
  Telefon: string;
  EMail: string;
  AllowSaveAddress: boolean;
  AllowTransferToLFB: boolean;
  AllowNewsletter: boolean;
  FlagDeleted?: boolean;
  IsAktivGastgeber: boolean;
  UmsatzAktivWettbewerb?: number;
}

export class AktivGastgeberpass {
  Oid: number;
  Jahr: number;
  PersonalakteID: number;
  DOIDPersonalakte: number;
  PersonalakteName: string;
  BZLID: number;
  BZLName: string;
  DOIDBZL: number;
  GPLID: number;
  GPLName: string;
  DOIDGPL: number;
  Gastgebername: string;
  Umsaetze?: AktivGastgeberUmsatz[];
  AddFremdUmsaetze: boolean;
  FremdFachberatername: string;
  Notizen: string;
  NotizenInternal: string;
  Status: number;
  IsInvalid: boolean;
}

export class AktivGastgeberUmsatz {
  Datum: Date;
  Umsatz: number;
}

export class AktivgastgeberpassSearchResultItem {
  Oid: number;
  Zeitraum: string;
  Gastgebername: string;
  Status: number;
  IsInvalid: boolean;
}

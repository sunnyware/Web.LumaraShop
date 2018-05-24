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
}

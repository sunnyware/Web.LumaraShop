export class Fachberater {
  ID: number;
  PersonalNr: string;
  Anrede: string;
  Vorname: string;
  Nachname: string;
  Strasse: string;
  Land: string;
  PLZ: string;
  Ort: string;
  Telefon: string;
  Telefax: string;
  Mobil: string;
  EMail: string;
  Steuernummer: string;

  IBAN: string;
  BIC: string;

  AllowSaveData: boolean;
  AllowNewsletter: boolean;
  AllowPublicImages: boolean;
  AllowPublicOnHomepage: boolean;

  ChatToken: string;
  ChatID: number;
}

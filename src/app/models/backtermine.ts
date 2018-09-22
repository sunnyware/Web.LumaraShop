export class BackterminItem {
  PersonalakteID: number;
  ID: number;
  Caption: string;
  DateBegin: Date;
  Ort: string;
  AnzahlTeilnehmer: number;
}

export class Backtermin {
  PersonalakteID: number;
  ID: number;
  UserID: number;
  Caption: string;
  DateBegin: Date;
  DateEnd: Date;
  Dauer: string;
  OrtID: number;
  MaxTeilnehmer: number;
}

export class BackterminAnmeldungItem {
  ID: number;
  BackterminID: number;
  Name: string;
  Kontakt: string;
  PLZ: string;
  AnzahlTeilnehmer: number;
}

export class BackterminAnmeldung {
  ID: number;
  BackterminID: number;
  Name: string;
  Telefon: string;
  EMail: string;
  PLZ: string;
  AnzahlTeilnehmer: number;
  IsStorniert: boolean;
}

export class BackterminOrt {
  ID: number;
  Strasse: string;
  PLZ: string;
  Ort: string;
}

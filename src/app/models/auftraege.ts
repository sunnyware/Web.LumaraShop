export class Auftrag {
  ID: number;
  MandantID: number;
  BstDatum: Date;
  BstNr: string;
  KW: number;
  Status: string;
  Umsatz: number;
  Zahlbetrag: number;
  Pakete?: Paket[];
}

export class Paket {
  Referenz: string;
  PaketNr: string;
  StatusString: string;
  TimeStatus: Date;
  Gewicht: number;
}

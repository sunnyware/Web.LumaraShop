export class StatistikJahresspiegel {
  Caption: string;
  TimeStamp: Date;
  Duration: number;
  Statistik?: MyChartItem[];
}

export class StatistikJahresstatistik {
  Caption: string;
  TimeStamp: Date;
  Duration: number;
  Statistik?: MyChartItem[];
}

export class MyChartItem {
  Label: string;
  Value: number;
}

export class StatistikRankingList {
  Caption: string;
  TimeStamp: Date;
  Duration: number;
  MaxUmsatz: number;
  Statistik?: RankingItem[];
}

export class RankingItem {
    DOIDLFB: number;
    Rank: number;
    Name: string;
    Umsatz: number;
}

export class GastgeberStatistikItem {
  IDObj: string;
  Vorname: string;
  Nachname: string;
  Ort: string;
  Umsatz: number;
  UmsatzManual: number;
  UmsatzManualAccepted: boolean;
  Vortraege: number;
  LFBDOID: number;
  LFBName: string;
  GPLDOID: number;
  GPLName: string;
  BZLDOID: number;
  BZLName: string;
}

export class GastgeberUmsatzItem {
  IDObj: string;
  Datum: Date;
  Umsatz: number;
  IDMandant: number;
  InternalNote: string;
}
